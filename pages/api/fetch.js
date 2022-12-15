import fetch from "node-fetch";
import { stringifyUrl } from "query-string";
import { createManyJobs } from "../../controllers/jobs";
import { constructUrlQuery } from "../../helpers/constructUrlQuery";
import { extractJobDetails } from "../../helpers/extractJobDetails";
import { notifyTelegram } from "../../helpers/notifyTelegram";

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
    const requestUrl = stringifyUrl({
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

  await createManyJobs(withSchmeas);

  // Send alert to telegram
  const count = withSchmeas.length;
  let telegram = `${count} new jobs!\n\n`;

  withSchmeas.forEach((job) => {
    const { schema, title, link } = job;
    if (schema) {
      const { title, hiringOrganization, url } = schema;
      const company = hiringOrganization?.name;
      const text = `${title} @ ${company}\n${url}\n\n\n`;
      telegram += text;
    } else {
      telegram += `${title}\n${link}\n\n\n`;
    }
  });

  console.log(telegram);
  await notifyTelegram(telegram);

  res.json({ status: "OK", count });
}
