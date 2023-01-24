import { Flex, Heading, useCheckboxGroup } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR from "swr";

import { sites } from "../constants/sites";
import JobListing from "../components/JobListing";
import FilterCard from "../components/FilterCard";
import { extractQuery } from "../helpers/query";

const fetcher = (url) => fetch(url).then((r) => r.json());
function Search() {
  const { data, isLoading } = useSWR("/api/jobs", fetcher);
  const jobs = data?.jobs;

  const router = useRouter();
  const techFilter = useCheckboxGroup();
  const locationFilter = useCheckboxGroup();
  const {
    value: techValue,
    getCheckboxProps: techGetCheckboxProps,
    setValue: techSetValue,
  } = techFilter;
  const {
    value: locationValue,
    getCheckboxProps: locationGetCheckboxProps,
    setValue: locationSetValue,
  } = locationFilter;

  const { tech, location } = extractQuery(router.query);

  useEffect(() => {
    const filteredTech = tech?.filter(Boolean);
    const hasTech = filteredTech?.length > 0;
    const hasTechDefault = techValue?.length > 0;

    if (!hasTechDefault && hasTech) {
      techSetValue(filteredTech);
    }

    const filteredLocation = location?.filter(Boolean);
    const hasLocation = filteredLocation?.length > 0;
    const hasLocationDefault = locationValue?.length > 0;

    if (!hasLocationDefault && hasLocation) {
      locationSetValue(filteredLocation);
    }
  });

  if (isLoading) {
    return "Loading...";
  }

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
          <Flex flexDirection="column">
            {jobs?.map((job) => (
              <JobListing key={job._id} job={job} />
            ))}
          </Flex>
        </Flex>
      </Flex>
      <FilterCard
        techGetCheckboxProps={techGetCheckboxProps}
        locationGetCheckboxProps={locationGetCheckboxProps}
      />
    </div>
  );
}

export default Search;
