import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  HStack,
  Link,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import queryString from "query-string";
import React from "react";
import FlagIcon from "../../components/FlagIcon";
import JobListing from "../../components/JobListing";
import TechIcon from "../../components/TechIcon";
import { frameworks, places } from "../../constants/paths";
import { getJobs } from "../../controllers/jobs";
import { capitalize } from "../../helpers/capitalize";

export const getStaticProps = async (context) => {
  const { tech, location } = context.params;
  const { jobs } = await getJobs({ tech, location });

  return {
    props: {
      jobs,
      location,
      tech: tech === "all" ? "tech" : tech,
    },
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
    return "/search?" + query;
  };

  return (
    <div>
      <Head>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageTitle()} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex flexDirection="column" maxW="2xl" mx="auto" p="4">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/`}>Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href={`/filters`}>Filters</BreadcrumbLink>
          </BreadcrumbItem>

          {tech !== "tech" && (
            <BreadcrumbItem>
              <BreadcrumbLink
                as={HStack}
                href={`/${tech}`}
                textTransform="capitalize"
              >
                <TechIcon name={tech} size="15px" />
                <Text as="span">{techName}</Text>
              </BreadcrumbLink>
            </BreadcrumbItem>
          )}

          {location !== "all" && (
            <BreadcrumbItem>
              <BreadcrumbLink
                as={HStack}
                href={`/${location}`}
                textTransform="capitalize"
              >
                <FlagIcon name={location} size="15px" />
                <Text as="span">{locationName}</Text>
              </BreadcrumbLink>
            </BreadcrumbItem>
          )}
        </Breadcrumb>

        <HStack mt="2">
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
          <Link fontSize="sm" href={getMoreHref()}>
            Show more jobs 🚀
          </Link>
        </Flex>
      </Flex>
    </div>
  );
}

export default JobList;
