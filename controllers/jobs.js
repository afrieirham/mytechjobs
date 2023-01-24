import { places } from "../constants/paths";
import { connectToDatabase } from "../libs/mongo";

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

export const getLatestJobs = async (limit) => {
  const { db } = await connectToDatabase();

  const pipeline = [
    {
      $match: {
        keywords: {
          $in: places.map((p) => p.replaceAll("-", " ")),
        },
      },
    },
  ];

  const cursor = await db
    .collection("jobs")
    .aggregate(pipeline)
    .sort({ _id: -1 })
    .limit(limit)
    .toArray();

  const jobs = JSON.parse(JSON.stringify(cursor));

  return { jobs };
};

export const getRemoteJobs = async (limit) => {
  const { db } = await connectToDatabase();

  const pipeline = [
    {
      $match: {
        keywords: {
          $in: ["remote"],
        },
      },
    },
  ];

  const cursor = await db
    .collection("jobs")
    .aggregate(pipeline)
    .sort({ _id: -1 })
    .limit(limit)
    .toArray();

  const jobs = JSON.parse(JSON.stringify(cursor));

  return { jobs };
};

export const getJobs = async ({ tech, location }) => {
  const { db } = await connectToDatabase();

  const pipeline = constructPipeline({ tech, location });

  const cursor = await db
    .collection("jobs")
    .aggregate(pipeline)
    .sort({ _id: -1 })
    .toArray();

  const jobs = JSON.parse(JSON.stringify(cursor));
  return { jobs };
};

const constructPipeline = ({ tech, location }) => {
  if (tech === "all") {
    return [
      {
        $match: {
          keywords: {
            $in: getPlaceKeywords(location),
          },
        },
      },
    ];
  }

  // specific all
  if (location === "all") {
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

  // specific specific
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
          $in: getPlaceKeywords(location),
        },
      },
    },
  ];
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
  return [term];
};
