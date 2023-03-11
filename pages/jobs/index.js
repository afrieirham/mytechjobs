import React, { useEffect, useState } from "react";
import Head from "next/head";
import useSWR from "swr";
import queryString from "query-string";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Spinner,
  Stack,
  Tag,
  Text,
  useCheckboxGroup,
} from "@chakra-ui/react";

import { siteDescription } from "../../constants/SEO";
import { standardizeQuery } from "../../helpers/query";
import JobListing from "../../components/JobListing";
import FilterCard from "../../components/FilterCard";
import FilterDesktop from "../../components/FilterDesktop";
import { fetcher } from "../../helpers/fetcher";

function Search() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("posted");

  const jobTypeFilter = useCheckboxGroup();
  const techFilter = useCheckboxGroup();
  const locationFilter = useCheckboxGroup();

  const query = queryString.stringify({
    page,
    sortBy: router.query.sortBy ? router.query.sortBy : sortBy,
    jobType: router.query.jobType ? router.query.jobType : jobTypeFilter.value,
    tech: router.query.tech ? router.query.tech : techFilter.value,
    location: router.query.location
      ? router.query.location
      : locationFilter.value,
  });

  const { data, isLoading } = useSWR("/api/jobs?" + query, fetcher);

  const [hasNext, setHasNext] = useState(true);
  const [hasPrevious, setHasPrevious] = useState(true);
  const [jobs, setJobs] = useState([]);
  const featured = data?.featured;

  useEffect(() => {
    if (router?.query?.tech) {
      techFilter.setValue(standardizeQuery(router.query.tech));
    } else {
      techFilter.setValue([]);
    }
    if (router?.query?.location) {
      locationFilter.setValue(standardizeQuery(router.query.location));
    } else {
      locationFilter.setValue([]);
    }
    if (router?.query?.jobType) {
      jobTypeFilter.setValue(standardizeQuery(router.query.jobType));
    } else {
      jobTypeFilter.setValue([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  useEffect(() => {
    const hasNext = data?.jobs?.length === 10;
    const hasPrevious = page > 1;
    setJobs(data?.jobs);
    setHasNext(hasNext);
    setHasPrevious(hasPrevious);
  }, [data?.jobs, page]);

  const onLoadNext = () => setPage(page + 1);
  const onLoadPrevious = () => setPage(page - 1);

  const tags = [techFilter.value, locationFilter.value].flat();
  const hasTags = tags?.length > 0;
  const hasFeatured = featured?.length > 0;

  return (
    <Box bg="gray.50">
      <Head>
        <title>Find your next tech jobs in Malaysia 🇲🇾 | Kerja IT</title>
        <meta name="description" content={siteDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        flexDirection="column"
        maxW="2xl"
        mx="auto"
        p="4"
        position="relative"
      >
        {/* Job Listing */}
        <Flex
          w="full"
          flexDirection="column"
          style={{ overflowAnchor: "none" }}
        >
          <Heading size="sm" mt="4">
            👨🏻‍💻 Explore Jobs
          </Heading>
          <HStack mt="4">
            <Text fontSize="xs" color="gray.600">
              Showing results for:
            </Text>
            {!hasTags && (
              <Tag size="sm" colorScheme="messenger">
                All
              </Tag>
            )}
            {tags.map((v, i) => (
              <Tag key={i} size="sm" colorScheme="messenger">
                {v.replaceAll("-", " ")}
              </Tag>
            ))}
          </HStack>
          <div>
            {isLoading ? (
              <Flex w="full" h="full" justify="center" mt="16">
                <Spinner />
              </Flex>
            ) : (
              <Flex flexDirection="column">
                {hasFeatured && (
                  <>
                    {featured?.map((job) => (
                      <JobListing key={job._id} job={job} featured />
                    ))}
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
                {jobs?.map(({ featured, ...job }) => (
                  <JobListing key={job._id} job={job} />
                ))}
                <HStack mt="4" justifyContent="center">
                  <Button
                    display={hasPrevious ? "block" : "none"}
                    size="sm"
                    onClick={onLoadPrevious}
                    isLoading={isLoading}
                  >
                    Back
                  </Button>
                  <Button
                    display={hasNext ? "block" : "none"}
                    size="sm"
                    onClick={onLoadNext}
                    isLoading={isLoading}
                  >
                    Next
                  </Button>
                </HStack>
              </Flex>
            )}
            <HStack maxW="2xl" mx="auto" p="8" justifyContent="center" mt="4">
              <Link href="/profile" isExternal textAlign="center">
                Applied but no response? Drop your resume here 📥
              </Link>
            </HStack>
          </div>
        </Flex>
        <FilterDesktop
          sortBy={sortBy}
          setSortBy={setSortBy}
          setPage={setPage}
          techValue={techFilter.value}
          locationValue={locationFilter.value}
          jobTypeValue={jobTypeFilter.value}
          onChangeTech={techFilter.onChange}
          onChangeLocation={locationFilter.onChange}
          onChangeJobType={jobTypeFilter.onChange}
          techGetCheckboxProps={techFilter.getCheckboxProps}
          locationGetCheckboxProps={locationFilter.getCheckboxProps}
          jobTypeGetCheckboxProps={jobTypeFilter.getCheckboxProps}
        />
      </Flex>
      <FilterCard
        sortBy={sortBy}
        setSortBy={setSortBy}
        setPage={setPage}
        techValue={techFilter.value}
        locationValue={locationFilter.value}
        jobTypeValue={jobTypeFilter.value}
        onChangeTech={techFilter.onChange}
        onChangeLocation={locationFilter.onChange}
        onChangeJobType={jobTypeFilter.onChange}
        techGetCheckboxProps={techFilter.getCheckboxProps}
        locationGetCheckboxProps={locationFilter.getCheckboxProps}
        jobTypeGetCheckboxProps={jobTypeFilter.getCheckboxProps}
      />
    </Box>
  );
}

export default Search;
