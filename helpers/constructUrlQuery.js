import { format, sub } from "date-fns";

export const constructUrlQuery = () => {
  const time = `after:${format(sub(new Date(), { days: 1 }), "yyyy-MM-dd")}`;

  const location = constructLocationQuery([
    "Johor",
    "Kedah",
    "Kelantan",
    "Melaka",
    "Negeri Sembilan",
    "Pahang",
    "Perak",
    "Perlis",
    "Pulau Pinang",
    "Sarawak",
    "Selangor",
    "Terengganu",
    "Kuala Lumpur",
    "Labuan",
    "Sabah",
    "Putrajaya",
    "Malaysia",
  ]);

  const terms = constructLocationQuery([
    "react js",
    "react native",
    "vue",
    "angular",
    "node js",
    "laravel",
    "flutter",
    "django",
    "kotlin",
    "webflow",
  ]);

  const query = `${time} ${terms} ${location}`;

  return query;
};

const constructLocationQuery = (locations) => {
  const lQuery = locations
    .map((location) => `"${location.toLowerCase()}"`)
    .join(" | ");
  return `(${lQuery})`;
};
