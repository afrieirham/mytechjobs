import { differenceInDays } from "date-fns";

export const checkIfThisWeek = (someDate) => {
  // const result = formatDistanceToNow(new Date(someDate));
  const result = differenceInDays(new Date(), new Date(someDate));

  return result < 8;
};
