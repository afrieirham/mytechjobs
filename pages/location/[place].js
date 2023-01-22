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
import { places } from "../../constants/paths";
import { getJobsByKeyword } from "../../controllers/jobs";
import { capitalize } from "../../helpers/capitalize";

export const getStaticProps = async (context) => {
  const { place } = context.params;

  let keywords = [place.replace("-", " ")];
  if (place === "ns") {
    keywords = ["negeri sembilan"];
  }
  if (place === "penang") {
    keywords = ["pulau pinang"];
  }
  if (place === "kl") {
    keywords = ["kuala lumpur"];
  }

  const jobs = await getJobsByKeyword(keywords);

  return {
    props: {
      jobs,
      place,
    },
  };
};

export async function getStaticPaths() {
  const paths = places.map((item) => ({ params: { place: item } }));
  return {
    paths,
    fallback: false,
  };
}

function Place({ jobs, place }) {
  const getActualPlace = () => {
    switch (place) {
      case "ns":
        return "negeri-sembilan";
      case "kl":
        return "kuala-lumpur";
      default:
        return place;
    }
  };

  const actualPlace = getActualPlace();
  const state = capitalize(actualPlace.replace("-", " "));
  const pageTitle = `Tech Jobs in ${state}`;

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
            <BreadcrumbLink
              href={`/location/${place}`}
              textTransform="capitalize"
            >
              {state}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <HStack mt="2">
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

export default Place;
