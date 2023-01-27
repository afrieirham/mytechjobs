import fetch from "node-fetch";
import queryString from "query-string";
import { createManyJobs } from "../../controllers/jobs";
import { constructUrlQuery } from "../../helpers/constructUrlQuery";
import { extractJobDetails } from "../../helpers/extractJobDetails";
import { getKeywordsFromSnippet } from "../../helpers/getKeywordsFromSnippet";
import { notifyTelegram } from "../../helpers/notifyTelegram";
import { slugify } from "../../helpers/slugify";

const URL = "https://www.googleapis.com/customsearch/v1";

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== "POST") {
    return res.status(405).json({ status: "not allowed" });
  }

  const { cx, key } = body;

  if (!cx || !key) {
    return res.status(400).json({ status: "no body" });
  }

  const q = constructUrlQuery();

  let results = [];
  let start = 1;

  while (true) {
    const requestUrl = queryString.stringifyUrl({
      url: URL,
      query: { start, cx, key, q },
    });
    const result = await fetch(requestUrl).then((res) => res.json());

    // add if has result
    if (result?.items?.length > 0) {
      results.push(...result.items);
    }

    // stop if no next page
    if (!result?.queries?.nextPage) {
      break;
    }

    start += 10;
  }

  if (results?.length === 0) {
    return res.json({ status: "OK", message: "no jobs added" });
  }

  const schemas = await Promise.all(
    results.map(({ link }) => extractJobDetails(link))
  );

  const withSchmeas = results.map(({ pagemap, ...rest }, i) => ({
    ...rest,
    schema: schemas[i],
  }));

  const withKeywords = withSchmeas.map((job) => {
    const isRemote =
      job?.schema?.description?.includes("remote") ||
      job?.schema?.responsibilities?.includes("remote");
    const keywords = getKeywordsFromSnippet(job.htmlSnippet);

    return {
      ...job,
      keywords: isRemote ? [...keywords, "remote"] : keywords,
    };
  });

  const withSlug = withKeywords.map((job) => ({ ...job, slug: slugify(job) }));

  const inserted = await createManyJobs(withSlug);

  if (!inserted) {
    return res.json({
      status: "OK",
      message: "no jobs added because duplicates",
    });
  }

  // Send alert to telegram
  const count = withSlug.length;
  let telegram = `${count} new jobs!\n\n`;

  withSlug.forEach((job) => {
    const { schema, title, slug } = job;
    const applyUrl = "https://kerja-it.com/jobs/" + slug;
    if (schema) {
      const { title, hiringOrganization } = schema;
      const company = hiringOrganization?.name;
      const text = `${title} @ ${company}\n${applyUrl}\n\n\n`;
      telegram += text;
    } else {
      telegram += `${title}\n${applyUrl}\n\n\n`;
    }
  });

  await notifyTelegram(telegram);

  res.json({ status: "OK", count });
}
