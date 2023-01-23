import { frameworks, places } from "../constants/paths";
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

export const getJobsByKeyword = async (query) => {
  const { db } = await connectToDatabase();

  const pipiline = constructPipeline(query);

  const cursor = await db
    .collection("jobs")
    .aggregate(pipiline)
    .sort({ _id: -1 })
    .toArray();

  const result = JSON.parse(JSON.stringify(cursor));
  const jobs = result.filter((job) => {
    const isLocal =
      job?.schema?.jobLocation?.address?.addressCountry?.toLowerCase() ===
      "malaysia";
    const isRemote =
      job?.schema?.description?.includes("remote") ||
      job?.schema?.responsibilities?.includes("remote");

    return isLocal || isRemote;
  });

  return { jobs };
};

const constructPipeline = (query) => {
  const type = getQueryType(query);
  const [tech, place] = getTechAndPlace(query);

  if (type === "tech-location") {
    return [
      {
        $match: {
          keywords: {
            $in: getTechKeywords(tech),
          },
        },
      },
      {
        $match: {
          keywords: {
            $in: getPlaceKeywords(place),
          },
        },
      },
    ];
  }

  if (type === "location") {
    return [
      {
        $match: {
          keywords: {
            $in: getPlaceKeywords(place),
          },
        },
      },
    ];
  }

  if (type === "tech") {
    return [
      {
        $match: {
          keywords: {
            $in: getTechKeywords(tech),
          },
        },
      },
    ];
  }

  return [];
};

const getTechKeywords = (query) => {
  const term = query.replaceAll("-", " ");
  if (term === "react") {
    return ["react js", "react native"];
  }

  return [term];
};

const getPlaceKeywords = (query) => {
  const term = query.replaceAll("-", " ");

  if (term === "ns") {
    return ["negeri sembilan"];
  }
  if (term === "penang") {
    return ["pulau pinang"];
  }
  if (term === "kl") {
    return ["kuala lumpur"];
  }
  return [term];
};

const getQueryType = (query) => {
  if (query.includes("-in-")) {
    return "tech-location";
  }
  if (frameworks.includes(query)) {
    return "tech";
  }
  if (places.includes(query)) {
    return "location";
  }
};

export const getTechAndPlace = (query) => {
  const type = getQueryType(query);

  if (type === "tech") {
    return [query, "malaysia"];
  }
  if (type === "location") {
    return ["tech", query];
  }

  return query.split("-in-");
};
