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
import { getJobsByKeyword } from "../../controllers/jobs";
import TechIcon from "../../components/TechIcon";
import JobListing from "../../components/JobListing";
import { frameworks } from "../../constants/paths";

export const getStaticProps = async (context) => {
  const { framework } = context.params;

  let keywords = [framework.replace("-", " ")];
  if (framework === "react") {
    keywords = ["react js", "react native"];
  }

  const jobs = await getJobsByKeyword(keywords);

  return {
    props: {
      jobs,
      framework,
    },
  };
};

export async function getStaticPaths() {
  const paths = frameworks.map((item) => ({ params: { framework: item } }));
  return {
    paths,
    fallback: false,
  };
}

function Framework({ jobs, framework }) {
  const tech = capitalize(framework.replace("-", " "));
  const pageTitle = `${tech} Jobs In Malaysia 🇲🇾`;

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
              href={`/tech/${framework}`}
              textTransform="capitalize"
            >
              {tech}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <HStack mt="2">
          <TechIcon name={framework} />
          <Heading size="md" textTransform="capitalize">
            {pageTitle}
          </Heading>
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

export default Framework;
