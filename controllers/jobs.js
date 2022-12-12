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
