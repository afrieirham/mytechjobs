import Head from "next/head";
import NextLink from "next/link";
import { Button, Flex, Heading, HStack, Text, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";

import JobListing from "../components/JobListing";
import { getLatestJobs, getRemoteJobs } from "../controllers/jobs";
import { sites } from "../constants/sites";

export const getStaticProps = async () => {
  const { jobs: latest } = await getLatestJobs(4);
  const { jobs: remote } = await getRemoteJobs(4);

  return {
    props: {
      latest,
      remote,
    },
  };
};

export default function Home({ latest, remote }) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Malaysia Tech Jobs 🇲🇾</title>
        <meta
          name="description"
          content={`Daily tech jobs sourced from ${sites.join(", ")}.`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex flexDirection="column" maxW="2xl" mx="auto" p="4">
        {/* Header */}
        <Flex flexDirection="column" w="full">
          <Heading size="lg">Malaysia Tech Jobs 🇲🇾</Heading>
          <Text fontSize="sm">Find your next tech jobs in Malaysia.</Text>
          <Text fontSize="2xs" color="gray.600">
            Jobs are sourced from {sites.join(", ")}{" "}
            <Text as="span" fontWeight="bold">
              daily
            </Text>
            .
          </Text>
        </Flex>

        {/* Latest Jobs */}
        <Flex flexDirection="column" w="full" mt="8">
          <HStack as={Link} href="/search">
            <Heading size="md">⏳ Latest Jobs →</Heading>
          </HStack>
          <Flex flexDirection="column">
            {latest.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </Flex>
        </Flex>

        <Flex flexDirection="column" w="full" mt="8">
          <HStack as={Link} href="/search?location=remote">
            <Heading size="md">🏝 Remote Jobs →</Heading>
          </HStack>
          <Flex flexDirection="column">
            {remote.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}
