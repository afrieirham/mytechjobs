import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
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
  const getPageTitle = () => {
    const techName = tech.replaceAll("-", " ");
    const locationName =
      location === "all" ? "malaysia 🇲🇾" : location.replaceAll("-", " ");

    if (location === "remote") {
      return capitalize(`Remote ${techName} jobs 👨🏻‍💻🏝`);
    }

    return capitalize(`${techName} jobs in ${locationName}`);
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

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href={`/`} textTransform="capitalize">
              {getPageTitle()}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <HStack mt="2">
          <TechIcon name={tech} />
          <Heading size="md" textTransform="capitalize">
            {getPageTitle()}
          </Heading>
          <FlagIcon name={location} />
        </HStack>
        <Flex mt="4">
          <Text fontSize="xs" color="gray.600">
            Total jobs: {jobs.length}
          </Text>
        </Flex>

        <Flex flexDirection="column">
          {jobs.map((job) => (
            <JobListing key={job._id} job={job} />
          ))}
        </Flex>
      </Flex>
    </div>
  );
}

export default JobList;
