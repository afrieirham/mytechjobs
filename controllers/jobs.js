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

export const getJobs = async ({ tech, location }) => {
  const { db } = await connectToDatabase();

  const pipeline = constructPipeline({ tech, location });

  const cursor = await db
    .collection("jobs")
    .aggregate(pipeline)
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

const constructPipeline = ({ tech, location }) => {
  if (tech === "all") {
    // all remote
    if (location === "remote") {
      return [
        {
          $match: {
            $text: {
              $search: "remote",
            },
          },
        },
      ];
    }

    // all specific
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

  if (location === "remote") {
    return [
      {
        $match: {
          keywords: {
            $in: getTechKeywords(tech),
          },
          $text: {
            $search: "remote",
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
