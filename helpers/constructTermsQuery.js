export const constructTermsQuery = (techs, locations) =>
  techs
    .map((tech) => locations.map((location) => `"${tech}" "${location}"`))
    .flat();
