import { load } from "cheerio";
import { getUrlBody } from "./fetch";

export const extractJobDetails = async (url) => {
  // Fetch url content
  const response = await getUrlBody(url);

  // Get json-ld of the page
  const $ = load(response);
  const text = $("script[type='application/ld+json']").text();

  if (!text) {
    return null;
  }

  // Check if multiple json-ld
  const split = text.split("}{");

  // Find jsob-ld for "JobPosting"
  if (split.length > 1) {
    const fixed = split.map((item, i) =>
      i % 2 === 0 ? item + "}" : "{" + item
    );
    const formatted = fixed.map((i) => JSON.parse(i));
    const needed = formatted.find((item) => item["@type"] === "JobPosting");
    return needed;
  }

  // Check if jsob-ld is "JobPosting"
  const needed = JSON.parse(text);
  if (needed["@type"] === "JobPosting") {
    return needed;
  }

  return null;
};
