import fetch from "node-fetch";
import { stringifyUrl } from "query-string";
import { constructUrlQuery } from "../../helpers/constructUrlQuery";
import { extractJobDetails } from "../../helpers/extractJobDetails";

const cx = process.env.GOOGLE_SEARCH_CX;
const key = process.env.GOOGLE_SEARCH_KEY;
const URL = "https://www.googleapis.com/customsearch/v1";

export default async function handler(req, res) {
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

  res.status(200).json({ jobs: withSchmeas });
}
