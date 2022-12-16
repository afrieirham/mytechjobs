import { load } from "cheerio";

export const getKeywordsFromSnippet = (snippet) => {
  const $ = load(snippet);
  const keywords = $("b").toArray();

  let raw = [];

  keywords.forEach((keyword) => {
    raw.push(keyword.children[0].data);
  });

  const clean = raw
    .filter((text) => text !== "...")
    .map((t) => t.toLowerCase());

  return [...new Set(clean)];
};
