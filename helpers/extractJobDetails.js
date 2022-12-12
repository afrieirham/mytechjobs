import fetch from "node-fetch";
import { load } from "cheerio";
import { getHtmlSPA } from "./getHtmlSPA";
import { getUrlBody } from "./fetch";

export const extractJobDetails = async (url) => {
  // Check if broken url
  const status = await fetch(url).then((res) => res.status);
  if (status >= 400) {
    return null;
  }

  // Fetch url content
  const response = await getUrlBody(url);

  // Get json-ld of the page
  const $ = load(response);
  const staticJobSchema = $("script[type='application/ld+json']").text();

  if (staticJobSchema) {
    return { url, ...extract(staticJobSchema) };
  }

  // SPAs
  const spaResponse = await getHtmlSPA(url);

  if (!spaResponse.includes("JobPosting")) {
    return null;
  }

  if (spaResponse) {
    const spa$ = load(spaResponse);
    const spajobSchema = spa$("script[type='application/ld+json']").text();
    return { url, ...extract(spajobSchema) };
  }

  // for briohr
  const jobTitle = $(".main-header .title-wrapper .title h1").text().trim();
  const companyName = $(".company-name").text().trim();
  const location = $(".location").text().trim();
  const description = $(".description .wrapper span").html();

  // no job schema
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

  return manual;
};

const extract = (html) => {
  // Check if multiple json-ld
  const split = html.split("}{");

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
  const needed = JSON.parse(html);
  if (needed["@type"] === "JobPosting") {
    return needed;
  }

  return null;
};
