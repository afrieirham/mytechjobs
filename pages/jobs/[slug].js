import React from "react";
import Head from "next/head";
import unescape from "unescape";
import NextLink from "next/link";
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
  VStack,
} from "@chakra-ui/react";
import { format } from "date-fns";
import queryString from "query-string";

import { checkIfThisWeek } from "../../helpers/checkIfThisWeek";
import { siteDescription } from "../../constants/SEO";
import { getAllSlugs, getJobBySlug } from "../../controllers/jobs";
import { JOB_EXPERIENCE_TEXT, JOB_TYPE_TEXT } from "../../types/jobs";
import PinIcon from "../../icons/PinIcon";
import CalendarIcon from "../../icons/CalendarIcon";
import ChakraMarkdown from "../../components/ChakraMarkdown";
import BriefcaseIcon from "../../icons/BriefcaseIcon";
import ClockIcon from "../../icons/ClockIcon";
import CashIcon from "../../icons/CashIcon";

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
    fallback: true,
  };
}

function ApplyButton({ link, email }) {
  const href = link ? link : `mailto:${email}`;
  return (
    <Flex direction="column">
      <Button
        as="a"
        href={href}
        target="_blank"
        colorScheme="messenger"
        w={{ base: "full", lg: "200px" }}
      >
        Apply Now 🚀
      </Button>
      <Text as="span" fontSize="sm" color="gray.600" mt="2">
        Please mention that you found the job on Kerja-IT.com, this helps us get
        more companies to post here. Thanks.
      </Text>
    </Flex>
  );
}

function JobDescription({ job, slug }) {
  const jobLink = job?.link || job?.application?.url;
  const jobFromAd = job?.source === "ad";
  const jobTitle =
    (job?.schema?.title ?? job?.title) ||
    "Opps... Can't find the job you're looking for";

  const jobExperience = job?.experience;

  const employmentType = job?.schema?.employmentType;
  const isEmploymentTypeArray = Array.isArray(employmentType);

  const employmentTypeValue = isEmploymentTypeArray
    ? employmentType.join(", ")
    : employmentType;

  const employmentTypeText =
    (employmentTypeValue ?? "")?.replaceAll("_", " ").toLowerCase() ||
    JOB_TYPE_TEXT[job?.type] ||
    "Unspecified";

  const companyName =
    job?.company?.name || job?.schema?.hiringOrganization?.name;
  const companyUrl = job?.company?.website ?? undefined;
  const datePosted = job?.postedAt;
  const jobDescription =
    job?.schema?.responsibilities || job?.schema?.description;
  const jobAdType = job?.location?.type;
  const jobAdLocation = job?.location?.city + ", " + job?.location?.state;

  const getJobLocation = () => {
    switch (jobAdType) {
      case 1:
        return "Full Remote";
      case 2:
        return jobAdLocation;
      case 3:
        return jobAdLocation + " (Hybrid)";
      default:
        return (
          job?.schema?.jobLocation?.address?.stressAddress ||
          job?.schema?.jobLocation?.address?.addressLocality ||
          job?.schema?.jobLocation?.address?.addressRegion
        );
    }
  };
  const jobLocation = getJobLocation();

  const pageTitleWithoutBrand = companyName
    ? `${jobTitle} – ${companyName}`
    : jobTitle;

  const pageTitle = pageTitleWithoutBrand + " | Kerja IT 🇲🇾";
  const thisWeek = checkIfThisWeek(job?.schema?.datePosted ?? job?.postedAt);

  const og = queryString.stringifyUrl(
    {
      url: "https://kerja-it.com/api/og",
      query: {
        title: jobTitle ? jobTitle : null,
        company: companyName ? companyName : null,
      },
    },
    { skipEmptyString: true, skipNull: true }
  );

  const salary = job?.salary;

  return (
    <Box bg="gray.50">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={siteDescription} />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={og} />
        <meta property="og:url" content={`https://kerja-it.com/jobs/${slug}`} />
        <meta property="og:site_name" content="Kerja IT" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {job && (
        <Breadcrumb mt="8" maxW="2xl" mb="4" mx={{ base: "4", md: "auto" }}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/jobs">Jobs</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href={`/jobs/${slug}`} noOfLines="1">
              {pageTitleWithoutBrand}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      )}
      {!job && (
        <Flex
          flexDirection="column"
          maxW="2xl"
          mx="auto"
          p={{ base: "4", md: "0" }}
          textAlign="center"
          alignItems="center"
          mt="8"
        >
          <Heading size="md">😵‍💫 Opps...</Heading>
          <Heading size="sm" mt="2" color="gray.600">
            Can&apos;t fint the job you&apos;re looking for.
          </Heading>
          <VStack mt="8">
            <Link as={NextLink} href="/jobs">
              Look for other jobs
            </Link>
            <Text>or</Text>
            <Button
              href="/profile"
              colorScheme="messenger"
              as="a"
              target="_blank"
            >
              Drop your resume here 📥
            </Button>
          </VStack>
        </Flex>
      )}
      {job && (
        <div>
          <Flex
            flexDirection="column"
            maxW="2xl"
            mx="auto"
            p={{ base: "4", md: "8" }}
            bg="white"
            borderWidth={{ base: "none", md: "1px" }}
            borderColor="gray.300"
            borderRadius={{ base: "none", md: "lg" }}
          >
            <HStack>
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
              {companyName && companyUrl && (
                <Text as={Link} fontSize="md" isExternal href={companyUrl}>
                  {companyName}
                </Text>
              )}
              {companyName && !companyUrl && (
                <Text fontSize="md">{companyName}</Text>
              )}
              <HStack mt="2">
                <CalendarIcon />
                <Text fontSize="sm">
                  {datePosted
                    ? "Posted on " + format(new Date(datePosted), "do MMM yyyy")
                    : "Unspecified"}
                </Text>
                {thisWeek && <Badge colorScheme="green">New</Badge>}
              </HStack>
              <HStack>
                <PinIcon />
                <Text fontSize="sm">{jobLocation ?? "Unspecified"}</Text>
              </HStack>
              <HStack>
                <BriefcaseIcon />
                <Text fontSize="sm" textTransform="capitalize">
                  {employmentTypeText}
                </Text>
              </HStack>
              <HStack>
                <ClockIcon />
                <Text fontSize="sm" textTransform="capitalize">
                  {JOB_EXPERIENCE_TEXT[jobExperience] ?? "Unspecified"}
                </Text>
              </HStack>
              {!!salary && (
                <HStack>
                  <CashIcon />
                  <Text fontSize="sm" textTransform="capitalize">
                    {new Intl.NumberFormat("en-UK", {
                      style: "currency",
                      currency: "MYR",
                    }).format(salary)}
                  </Text>
                </HStack>
              )}
            </Flex>
            <Flex mt="8">
              <ApplyButton link={jobLink} email={job?.application?.email} />
            </Flex>
            <Flex flexDirection="column" mt="8">
              <Heading size="md" mb="2">
                ✍️ Job Description
              </Heading>
              {jobFromAd ? (
                <Box mt="2" fontFamily="sans-serif" whiteSpace="pre-line">
                  <ChakraMarkdown>
                    {job?.description.replaceAll("\\n", "\n")}
                  </ChakraMarkdown>
                </Box>
              ) : (
                <Box
                  mt="2"
                  p={{ base: "4", md: "8" }}
                  fontFamily="sans-serif"
                  dangerouslySetInnerHTML={{
                    __html: unescape(jobDescription),
                  }}
                />
              )}
            </Flex>
            <Flex mt="8">
              <ApplyButton link={jobLink} email={job?.application?.email} />
            </Flex>
          </Flex>
          <HStack maxW="2xl" mx="auto" p="8" justifyContent="center" mt="4">
            <Link href="/profile" isExternal textAlign="center">
              Applied but no response? Drop your resume here 📥
            </Link>
          </HStack>
        </div>
      )}
    </Box>
  );
}

export default JobDescription;
