import React from "react";
import Head from "next/head";
import useSWR from "swr";
import queryString from "query-string";
import { Flex, Heading, Spinner, useCheckboxGroup } from "@chakra-ui/react";

import { sites } from "../constants/sites";
import JobListing from "../components/JobListing";
import FilterCard from "../components/FilterCard";
import FilterDesktop from "../components/FilterDesktop";

const fetcher = (url) => fetch(url).then((r) => r.json());
function Search() {
  const techFilter = useCheckboxGroup();
  const locationFilter = useCheckboxGroup();

  const query = queryString.stringify({
    tech: techFilter.value,
    location: locationFilter.value,
  });

  const { data, isLoading } = useSWR("/api/jobs?" + query, fetcher);
  const jobs = data?.jobs;

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
          {isLoading ? (
            <Flex w="full" h="full" justify="center" mt="16">
              <Spinner />
            </Flex>
          ) : (
            <Flex flexDirection="column">
              {jobs?.map((job) => (
                <JobListing key={job._id} job={job} />
              ))}
            </Flex>
          )}
        </Flex>
      </Flex>
      <FilterCard
        techGetCheckboxProps={techFilter.getCheckboxProps}
        locationGetCheckboxProps={locationFilter.getCheckboxProps}
      />
      <FilterDesktop
        techGetCheckboxProps={techFilter.getCheckboxProps}
        locationGetCheckboxProps={locationFilter.getCheckboxProps}
      />
    </div>
  );
}

export default Search;
