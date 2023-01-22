import { connectToDatabase } from "../libs/mongo";

export const createOneJob = async (data) => {
  const { db } = await connectToDatabase();
  const job = await db
    .collection("jobs")
    .insertOne({ ...data, createdAt: new Date().toISOString() });
  return job;
};

export const createManyJobs = async (data) => {
  const { db } = await connectToDatabase();
  const createdAt = new Date().toISOString();
  const formattedData = data.map((d) => ({
    ...d,
    createdAt,
  }));

  const jobs = await db.collection("jobs").insertMany(formattedData);
  return jobs;
};

export const getJobsByKeyword = async (keywords, query = []) => {
  const { db } = await connectToDatabase();

  const cursor = await db
    .collection("jobs")
    .find({ keywords: { $in: keywords } })
    .sort({ _id: -1 })
    .toArray();

  const jobs = JSON.parse(JSON.stringify(cursor));
  const result = jobs.filter((job) => {
    const isLocal =
      job?.schema?.jobLocation?.address?.addressCountry?.toLowerCase() ===
      "malaysia";
    const isRemote =
      job?.schema?.description?.includes("remote") ||
      job?.schema?.responsibilities?.includes("remote");

    return isLocal || isRemote;
  });

  if (query.length > 0) {
    return result.filter((job) => {
      const isInLocation = job?.keywords?.includes(query[0]);
      return isInLocation;
    });
  }

  return result;
};
