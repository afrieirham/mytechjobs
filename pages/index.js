import Head from "next/head";
import NextLink from "next/link";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

import { siteDescription } from "../constants/SEO";
import { getLatestJobs } from "../controllers/jobs";
import JobListing from "../components/JobListing";

export const getStaticProps = async () => {
  const { jobs: latest } = await getLatestJobs(30);

  return {
    props: {
      latest,
    },
    // revalidate every 1 hour
    revalidate: 60 * 60 * 1,
  };
};

export default function Home({ latest }) {
  const title = "Find Tech Jobs In Malaysia 🇲🇾 | Kerja IT";
  return (
    <Box bg="gray.50" pb="16">
      <Head>
        <title>{title}</title>
        <meta name="description" content={siteDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content="https://kerja-it.com/og.png" />
        <meta property="og:url" content="https://kerja-it.com" />
        <meta property="og:site_name" content="Kerja IT" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex flexDirection="column" maxW="4xl" mx="auto" p="4">
        {/* Header */}
        <Flex
          flexDirection="column"
          w="full"
          alignItems="center"
          textAlign="center"
          mt="4"
        >
          <Heading>Find Tech Jobs In Malaysia 🇲🇾</Heading>
          <Text color="gray.600">
            Let employers find you. Or apply to companies directly.
          </Text>
        </Flex>

        <VStack mt="8">
          <HStack>
            <Button
              color="white"
              bg="gray.900"
              _hover={{ bg: "gray.700" }}
              _active={{ bg: "gray.700" }}
              as="a"
              href="/auth?show=signup"
            >
              🎯 I want companies to find me
            </Button>
            <Button as="a" href="/jobs" variant="outline">
              🔍 I want to browse for jobs
            </Button>
          </HStack>
        </VStack>

        {/* Latest Jobs */}
        <Flex flexDirection="column" w="full" mt="16">
          <HStack>
            <Heading size="md" as={NextLink} href="/jobs">
              ⏳ Latest Jobs →
            </Heading>
          </HStack>
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacingX="2">
            {latest.map((job) => (
              <JobListing key={job._id} job={job} />
            ))}
          </SimpleGrid>
          <VStack mt="8">
            <Button as={NextLink} href="/jobs">
              Search 239+ more jobs
            </Button>
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
}
