import { getJobsJSON, getFeaturedJobs } from "../../controllers/jobs";
import { extractQuery, standardizeQuery } from "../../helpers/query";

export default async function handler(req, res) {
  const { method, query } = req;

  if (method !== "GET") {
    return res.status(405).json({ status: "not allowed" });
  }

  const { page, sortBy, tech, location, jobType } = query;
  const { jobs } = await getJobsJSON({
    page,
    sortBy,
    tech: standardizeQuery(tech),
    location: standardizeQuery(location),
    jobType: standardizeQuery(jobType),
  });
  const { featured } = await getFeaturedJobs();

  return res.status(200).json({ jobs, featured });
}
