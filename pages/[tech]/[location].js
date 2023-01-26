import Head from "next/head";
import React from "react";
import NextLink from "next/link";
import queryString from "query-string";
import { Box, Flex, Heading, HStack, Link } from "@chakra-ui/react";

import { getJobs } from "../../controllers/jobs";
import { capitalize } from "../../helpers/capitalize";
import { siteDescription } from "../../constants/SEO";
import { frameworks, places } from "../../constants/paths";
import FlagIcon from "../../components/FlagIcon";
import JobListing from "../../components/JobListing";
import TechIcon from "../../components/TechIcon";
import GlobalHeader from "../../components/GlobalHeader";

export const getStaticProps = async (context) => {
  const { tech, location } = context.params;
  const { jobs } = await getJobs({ tech, location });

  return {
    props: {
      jobs,
      location,
      tech: tech === "all" ? "tech" : tech,
    },
    // revalidate every 1 hour
    revalidate: 60 * 60 * 1,
  };
};

export async function getStaticPaths() {
  const paths = [
    ...frameworks.map((tech) =>
      places.map((location) => ({ params: { tech, location } }))
    ),
    ...frameworks.map((tech) => ({ params: { tech, location: "all" } })),
    ...places.map((location) => ({ params: { tech: "all", location } })),
  ].flat();

  return {
    paths,
    fallback: false,
  };
}

function JobList({ jobs, tech, location }) {
  const techName = tech.replaceAll("-", " ");
  const locationName =
    location === "all" ? "malaysia 🇲🇾" : location.replaceAll("-", " ");

  const getPageTitle = () => {
    if (location === "remote") {
      return capitalize(`Remote ${techName} jobs 👨🏻‍💻🏝`);
    }
    return capitalize(`${techName} jobs in ${locationName}`);
  };

  const getMoreHref = () => {
    const query = queryString.stringify(
      {
        tech: tech === "tech" ? null : tech,
        location: location === "all" ? null : location,
      },
      { skipNull: true }
    );
    return "/jobs?" + query;
  };

  return (
    <Box bg="gray.50">
      <Head>
        <title>{getPageTitle() + " | Kerja IT"}</title>
        <meta name="description" content={siteDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalHeader />

      <Flex flexDirection="column" maxW="2xl" mx="auto" p="4">
        <HStack mt="2" mx="auto">
          <TechIcon name={tech} />
          <Heading size="md" textTransform="capitalize">
            {getPageTitle()}
          </Heading>
          {location !== "remote" && <FlagIcon name={location} />}
        </HStack>

        <Flex flexDirection="column" mt="4">
          {jobs.map((job) => (
            <JobListing key={job._id} job={job} />
          ))}
        </Flex>

        <Flex justifyContent="center" my="8">
          <NextLink href={getMoreHref()} legacyBehavior passHref>
            <Link fontSize="sm">Show more jobs 🚀</Link>
          </NextLink>
        </Flex>
      </Flex>
    </Box>
  );
}

export default JobList;
