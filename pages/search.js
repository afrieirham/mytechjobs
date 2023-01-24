import React, { useEffect, useState } from "react";
import Head from "next/head";
import useSWR from "swr";
import queryString from "query-string";
import { useRouter } from "next/router";
import {
  Button,
  Flex,
  Heading,
  HStack,
  Spinner,
  Tag,
  Text,
  useCheckboxGroup,
} from "@chakra-ui/react";

import { sites } from "../constants/sites";
import JobListing from "../components/JobListing";
import FilterCard from "../components/FilterCard";
import FilterDesktop from "../components/FilterDesktop";
import { standardizeQuery } from "../helpers/query";

const fetcher = (url) => fetch(url).then((r) => r.json());
function Search() {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const techFilter = useCheckboxGroup();
  const locationFilter = useCheckboxGroup();

  const query = queryString.stringify({
    page,
    tech: router.query.tech ? router.query.tech : techFilter.value,
    location: router.query.location
      ? router.query.location
      : locationFilter.value,
  });

  const { data, isLoading } = useSWR("/api/jobs?" + query, fetcher);

  const [hasNext, setHasNext] = useState(true);
  const [hasPrevious, setHasPrevious] = useState(true);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (router?.query?.tech) {
      techFilter.setValue(standardizeQuery(router.query.tech));
    }
    if (router?.query?.location) {
      locationFilter.setValue(standardizeQuery(router.query.location));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.tech, router.query.location]);

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

  return (
    <div>
      <Head>
        <title>Search – Malaysia Tech Jobs 🇲🇾</title>
        <meta
          name="description"
          content={`Daily tech jobs sourced from ${sites.join(", ")}.`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex flexDirection="column" maxW="2xl" mx="auto" p="4" mb="16">
        {/* Header */}
        <Flex flexDirection="column" w="full">
          <Heading size="md">Search Tech Jobs in Malaysia🇲🇾</Heading>
        </Flex>

        {/* Job Listing */}
        <Flex flexDirection="column" w="full" mt="8">
          <Heading size="sm">👨🏻‍💻 Job Listing</Heading>
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
          {isLoading ? (
            <Flex w="full" h="full" justify="center" mt="16">
              <Spinner />
            </Flex>
          ) : (
            <Flex flexDirection="column">
              {jobs?.map((job) => (
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
        </Flex>
      </Flex>
      <FilterCard
        setPage={setPage}
        onChangeTech={techFilter.onChange}
        onChangeLocation={locationFilter.onChange}
        techGetCheckboxProps={techFilter.getCheckboxProps}
        locationGetCheckboxProps={locationFilter.getCheckboxProps}
      />
      <FilterDesktop
        setPage={setPage}
        onChangeTech={techFilter.onChange}
        onChangeLocation={locationFilter.onChange}
        techGetCheckboxProps={techFilter.getCheckboxProps}
        locationGetCheckboxProps={locationFilter.getCheckboxProps}
      />
    </div>
  );
}

export default Search;
