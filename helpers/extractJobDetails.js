import { load } from "cheerio";
import { getUrlBody } from "./fetch";

export const extractJobDetails = async (url) => {
  // Fetch url content
  const response = await getUrlBody(url);

  // Get json-ld of the page
  const $ = load(response);
  const jsonLdContent = $("script[type='application/ld+json']").text();

  // for briohr
  const jobTitle = $(".main-header .title-wrapper .title h1").text().trim();
  const companyName = $(".company-name").text().trim();
  const location = $(".location").text().trim();
  const description = $(".description .wrapper span").html();

  // SPAs
  const pageTitle = $("title").text();
  const metaDescription = $("meta[name=description]").attr("content");

  const title = jobTitle ? jobTitle : pageTitle;

  const manual = {
    url,
    title,
    companyName,
    location,
    description,
    metaDescription,
  };

  if (!jsonLdContent) {
    return manual;
  }

  // Check if multiple json-ld
  const split = jsonLdContent.split("}{");

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
  const needed = JSON.parse(jsonLdContent);
  if (needed["@type"] === "JobPosting") {
    return needed;
  }

  return manual;
};
