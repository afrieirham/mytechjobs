import Head from "next/head";
import { Flex, Heading, HStack, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { siteDescription } from "../constants/SEO";
import { getLatestJobs, getRemoteJobs } from "../controllers/jobs";
import JobListing from "../components/JobListing";

export const getStaticProps = async () => {
  const { jobs: latest } = await getLatestJobs(4);
  const { jobs: remote } = await getRemoteJobs(4);

  return {
    props: {
      latest,
      remote,
    },
    // revalidate every 1 hour
    revalidate: 60 * 60 * 1,
  };
};

export default function Home({ latest, remote }) {
  const title = "Find Tech Jobs In Malaysia 🇲🇾 | Kerja IT";
  return (
    <div>
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

      <Flex flexDirection="column" maxW="2xl" mx="auto" p="4">
        {/* Header */}
        <Flex flexDirection="column" w="full" alignItems="center" mt="4">
          <Heading size="lg">Daily Tech Jobs In Malaysia 🇲🇾</Heading>
        </Flex>

        {/* Latest Jobs */}
        <Flex flexDirection="column" w="full" mt="8">
          <HStack as={Link} href="/jobs">
            <Heading size="md">⏳ Latest Jobs →</Heading>
          </HStack>
          <Flex flexDirection="column">
            {latest.map((job) => (
              <JobListing key={job._id} job={job} />
            ))}
          </Flex>
        </Flex>

        <Flex flexDirection="column" w="full" mt="8">
          <HStack as={Link} href="/jobs?location=remote">
            <Heading size="md">🏝 Remote Jobs →</Heading>
          </HStack>
          <Flex flexDirection="column">
            {remote.map((job) => (
              <JobListing key={job._id} job={job} />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}
