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

import { capitalize } from "../../helpers/capitalize";
import { getActualPlace } from "../../helpers/getActualPlace";
import { getJobsByKeyword, getTechAndPlace } from "../../controllers/jobs";
import { frameworks, places } from "../../constants/paths";
import TechIcon from "../../components/TechIcon";
import FlagIcon from "../../components/FlagIcon";
import JobListing from "../../components/JobListing";

export const getStaticProps = async (context) => {
  const { query } = context.params;
  const { jobs } = await getJobsByKeyword(query);
  const [tech, place] = getTechAndPlace(query);

  return {
    props: {
      jobs,
      query,
      tech,
      place,
    },
  };
};

export async function getStaticPaths() {
  const techByLocation = frameworks
    .map((tech) => places.map((place) => `${tech}-in-${place}`))
    .flat();

  const allPaths = [...frameworks, ...places, ...techByLocation];

  const paths = allPaths.map((item) => ({ params: { query: item } }));
  return {
    paths,
    fallback: false,
  };
}

function Query({ jobs, query, tech, place }) {
  const actualPlace = getActualPlace(place);
  const pageTitle = capitalize(`${tech} jobs in ${actualPlace}`).replaceAll(
    "-",
    " "
  );

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageTitle} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex flexDirection="column" maxW="2xl" mx="auto" p="4">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/`}>Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href={`/list/${query}`} textTransform="capitalize">
              {pageTitle}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <HStack mt="2">
          <TechIcon name={tech} />
          <Heading size="md" textTransform="capitalize">
            {pageTitle}
          </Heading>
          <FlagIcon name={actualPlace} />
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

export default Query;
