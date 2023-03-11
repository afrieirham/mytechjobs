import Head from "next/head";
import NextLink from "next/link";
import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

import { siteDescription } from "../constants/SEO";
import { getFeaturedJobs, getLatestJobs } from "../controllers/jobs";
import JobListing from "../components/JobListing";

export const getStaticProps = async () => {
  const { jobs: latest } = await getLatestJobs(30);
  const { featured } = await getFeaturedJobs();

  return {
    props: {
      latest,
      featured,
    },
    // revalidate every 1 hour
    revalidate: 60 * 60 * 1,
  };
};

export default function Home({ latest, featured }) {
  const title = "Find Tech Jobs In Malaysia 🇲🇾 | Kerja IT";
  const hasFeatured = featured?.length > 0;
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

        <Stack direction="column" align="center" mt="8">
          <Stack direction={{ base: "column", md: "row" }}>
            <Button
              color="white"
              bg="gray.900"
              _hover={{ bg: "gray.700" }}
              _active={{ bg: "gray.700" }}
              as={NextLink}
              href="/profile"
            >
              🎯 I want companies to find me
            </Button>
            <Button as={NextLink} href="/jobs" variant="outline">
              🔍 Search Jobs
            </Button>
          </Stack>
        </Stack>

        {/* Latest Jobs */}
        {hasFeatured && (
          <>
            <Flex flexDirection="column" w="full" mt="16">
              <Stack>
                <Heading size="md">🦄 Featured Jobs</Heading>
              </Stack>
              <SimpleGrid columns={1} spacingX="2">
                {featured?.map((job) => (
                  <JobListing key={job._id} job={job} featured />
                ))}
              </SimpleGrid>
            </Flex>
            <Stack
              mt="2"
              alignItems="center"
              justifyContent="center"
              direction="row"
            >
              <Text fontSize="sm" textAlign="center">
                Want your job listed here?
              </Text>
              <Button as="a" href="/hire" size="sm" target="_blank">
                Post a job listing
              </Button>
            </Stack>
          </>
        )}
        <Flex flexDirection="column" w="full" mt="16">
          <Stack>
            <Heading size="md" as={NextLink} href="/jobs">
              ⏳ Latest Jobs →
            </Heading>
          </Stack>
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacingX="2">
            {latest.map(({ featured, ...job }) => (
              <JobListing key={job._id} job={job} />
            ))}
          </SimpleGrid>
          <Stack direction="row" mt="8" mx="auto">
            <Button as={NextLink} href="/jobs">
              Search 239+ more jobs
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
