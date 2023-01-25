import { formatDistanceToNow } from "date-fns";

export const checkIfToday = (someDate) => {
  const result = formatDistanceToNow(new Date(someDate));
  const allWords = result.split(" ");
  const wordsIfToday = allWords.some(
    (w) => w === "minute" || w === "minutes" || w === "hour" || w === "hours"
  );
  return wordsIfToday;
};
