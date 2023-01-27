/** @type {import('next').NextConfig} */

const abbrLocations = [
  {
    short: "kl",
    long: "kuala-lumpur",
  },
  {
    short: "penang",
    long: "pulau-pinang",
  },
  {
    short: "ns",
    long: "negeri-sembilan",
  },
];

const frameworks = [
  "react",
  "react-js",
  "react-native",
  "vue",
  "angular",
  "node-js",
  "laravel",
  "flutter",
  "django",
  "kotlin",
  "webflow",
];

const places = [
  "johor",
  "kedah",
  "kelantan",
  "melaka",
  "negeri-sembilan",
  "pahang",
  "perak",
  "perlis",
  "pulau-pinang",
  "sarawak",
  "selangor",
  "terengganu",
  "kuala-lumpur",
  "labuan",
  "sabah",
  "putrajaya",
  "remote",
];

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    const abbrAutoComplete = ["all", ...frameworks]
      .map((tech) =>
        abbrLocations.map(({ short, long }) => ({
          source: `/${tech}/${short}`,
          destination: `/${tech}/${long}`,
          permanent: true,
        }))
      )
      .flat();

    const techRedirects = frameworks.map((tech) => ({
      source: `/${tech}`,
      destination: `/${tech}/all`,
      permanent: true,
    }));

    const locationRedirects = places.map((location) => ({
      source: `/${location}`,
      destination: `/all/${location}`,
      permanent: true,
    }));

    const abbrRedirects = abbrLocations.map(({ short, long }) => ({
      source: `/${short}`,
      destination: `/all/${long}`,
      permanent: true,
    }));

    return [
      locationRedirects,
      abbrRedirects,
      techRedirects,
      abbrAutoComplete,
      {
        source: "/hire",
        destination: "https://hire.kerja-it.com",
        permanent: false,
      },
      {
        source: "/alerts",
        destination: "https://forms.gle/87gwhwGRxBKom6gSA",
        permanent: false,
      },
    ].flat();
  },
};

module.exports = nextConfig;
