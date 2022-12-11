import fetch from "node-fetch";
import { stringifyUrl } from "query-string";
import { constructUrlQuery } from "../../helpers/constructUrlQuery";
import { extractJobDetails } from "../../helpers/extractJobDetails";

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
    results.push(...result.items);

    if (!result?.queries?.nextPage) {
      break;
    }

    start += 10;
  }

  const cleanResults = results.map(({ pagemap, ...rest }) => rest);

  const schemas = await Promise.all(
    cleanResults.map(({ link }) => extractJobDetails(link))
  );

  const withSchmeas = cleanResults.map((r, i) => ({
    ...r,
    createdAt: new Date().toISOString(),
    schema: schemas[i],
  }));

  res.status(200).json({ status: "OK", count: withSchmeas.length });
}
