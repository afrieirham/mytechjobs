import { getJobsJSON, getFeaturedJobs } from "../../controllers/jobs";
import { extractQuery } from "../../helpers/query";

export default async function handler(req, res) {
  const { method, query } = req;

  if (method !== "GET") {
    return res.status(405).json({ status: "not allowed" });
  }

  const { page, sortBy } = query;
  const { tech, location } = extractQuery(query);
  const { jobs } = await getJobsJSON({ tech, location, page, sortBy });
  const { featured } = await getFeaturedJobs();

  return res.status(200).json({ jobs, featured });
}
