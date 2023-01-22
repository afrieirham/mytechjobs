export const getActualPlace = (place) => {
  switch (place) {
    case "ns":
      return "negeri-sembilan";
    case "kl":
      return "kuala-lumpur";
    default:
      return place;
  }
};
