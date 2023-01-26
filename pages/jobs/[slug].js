import Head from "next/head";
import React from "react";
import {
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Tag,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";

import { checkIfThisWeek } from "../../helpers/checkIfThisWeek";
import { siteDescription } from "../../constants/SEO";
import { getAllSlugs, getJobBySlug } from "../../controllers/jobs";
import PinIcon from "../../icons/PinIcon";
import CalendarIcon from "../../icons/CalendarIcon";

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  const { job } = await getJobBySlug(slug);

  return {
    props: { job, slug },
    // revalidate every 2 hour
    revalidate: 60 * 60 * 2,
  };
};

export async function getStaticPaths() {
  const { jobs } = await getAllSlugs();
  const paths = jobs.map((j) => ({ params: { slug: j.slug } }));

  return {
    paths,
    fallback: false,
  };
}

function ApplyButton({ link }) {
  return (
    <Link href={link} isExternal w={{ base: "full", sm: "xs" }}>
      <Button
        py="8"
        bg="black"
        color="white"
        _hover={{ bg: "gray.800" }}
        _active={{ bg: "gray.600" }}
        w="full"
      >
        Apply Now 🚀
      </Button>
    </Link>
  );
}

function JobDescription({ job, slug }) {
  const jobTitle = job?.schema?.title ?? job?.title;

  const companyName = job?.schema?.hiringOrganization?.name;
  const datePosted = job?.postedAt;
  const jobDescription =
    job?.schema?.responsibilities || job?.schema?.description;
  const jobLocation =
    job?.schema?.jobLocation?.address?.stressAddress ||
    job?.schema?.jobLocation?.address?.addressLocality ||
    job?.schema?.jobLocation?.address?.addressRegion;

  const pageTitleWithoutBrand = companyName
    ? `${jobTitle} – ${companyName}`
    : jobTitle;

  const pageTitle = pageTitleWithoutBrand + " | Kerja IT 🇲🇾";
  const thisWeek = checkIfThisWeek(job?.schema?.datePosted ?? job?.createdAt);

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={siteDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex flexDirection="column" maxW="2xl" mx="auto" p="4" mt="8">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="/jobs">Jobs</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href={`/jobs/${slug}`} noOfLines="1">
              {pageTitleWithoutBrand}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <HStack mt="6">
          {job?.keywords.map((keyword) => (
            <Tag key={keyword} size="sm" colorScheme="blackAlpha">
              {keyword}
            </Tag>
          ))}
        </HStack>
        <Heading size="lg" mt="2">
          {jobTitle}
        </Heading>
        <Flex flexDirection="column">
          {companyName && <Text fontSize="md">{companyName}</Text>}
          <HStack mt="2">
            <PinIcon />
            <Text fontSize="sm">{jobLocation ?? "Unspecified"}</Text>
          </HStack>
          <HStack>
            <CalendarIcon />
            <Text fontSize="sm">
              {datePosted
                ? "Posted on " + format(new Date(datePosted), "do MMM yyyy")
                : "Unspecified"}
            </Text>
            {thisWeek && <Badge colorScheme="green">New</Badge>}
          </HStack>
        </Flex>
        <Flex mt="8">
          <ApplyButton link={job?.link} />
        </Flex>
        <Flex flexDirection="column" mt="8">
          <Heading size="md" mb="2">
            ✍️ Job Description
          </Heading>
          <Box
            mt="2"
            p="8"
            borderWidth="1px"
            borderRadius="lg"
            borderColor="gray.300"
            fontFamily="sans-serif"
            dangerouslySetInnerHTML={{
              __html: jobDescription,
            }}
          />
        </Flex>
        <Flex mt="8" mb="32">
          <ApplyButton link={job?.link} />
        </Flex>
      </Flex>
    </div>
  );
}

export default JobDescription;
