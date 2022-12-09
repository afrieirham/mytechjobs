export const constructSiteQuery = (sites) =>
  sites.map((site) => "site:" + site).join(" | ");
