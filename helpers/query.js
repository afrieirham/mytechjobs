export const extractQuery = ({ tech, location }) => ({
  tech: standardizeQuery(tech),
  location: standardizeQuery(location),
});

const standardizeQuery = (params) => {
  if (!params) {
    return null;
  }

  if (!Array.isArray(params)) {
    return [params];
  }

  return params;
};
