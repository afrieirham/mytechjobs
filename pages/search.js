import {
  Checkbox,
  CheckboxGroup,
  Flex,
  Stack,
  useCheckboxGroup,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { sites } from "../constants/sites";

const extractQuery = ({ tech, location }) => ({
  tech: standardizeQuery(tech),
  location: standardizeQuery(location),
});

const standardizeQuery = (params) => {
  if (!Array.isArray(params)) {
    return [params];
  }

  return params;
};

function Search() {
  const router = useRouter();
  const { value, getCheckboxProps, setValue } = useCheckboxGroup();
  const { tech, location } = extractQuery(router.query);

  useEffect(() => {
    const filteredTech = tech.filter(Boolean);
    const hasTech = filteredTech?.length > 0;
    const hasDefault = value?.length > 0;

    if (!hasDefault && hasTech) {
      console.log("first");
      setValue(filteredTech);
    }
  });

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

      <Flex flexDirection="column" maxW="2xl" mx="auto" p="4">
        <CheckboxGroup colorScheme="green" value={value}>
          <Stack spacing={[1, 5]}>
            <Checkbox {...getCheckboxProps({ value: "naruto" })}>
              Naruto
            </Checkbox>
            <Checkbox {...getCheckboxProps({ value: "sasuke" })}>
              Sasuke
            </Checkbox>
            <Checkbox {...getCheckboxProps({ value: "kakashi" })}>
              Kakashi
            </Checkbox>
          </Stack>
        </CheckboxGroup>
        {/* Header */}
        {/* <Flex flexDirection="column" w="full">
          <Heading size="lg">Malaysia Tech Jobs 🇲🇾</Heading>
          <Text fontSize="sm">Find your next tech jobs in Malaysia.</Text>
          <Text fontSize="2xs" color="gray.600">
            Jobs are sourced from {sites.join(", ")}{" "}
            <Text as="span" fontWeight="bold">
              daily
            </Text>
            .
          </Text>
        </Flex> */}

        {/* <HStack mt="8" width="full" justifyContent="center" spacing="6">
          <Button
            size="sm"
            variant="solid"
            colorScheme="gray"
            onClick={() => router.push("/filters#tech")}
          >
            By Tech
          </Button>
          <Button
            size="sm"
            variant="solid"
            colorScheme="gray"
            onClick={() => router.push("/filters#location")}
          >
            By Location
          </Button>
        </HStack> */}

        {/* Latest Jobs */}
        {/* <Flex flexDirection="column" w="full" mt="8">
          <Heading size="md">⏳ Latest Jobs</Heading>
          <Flex flexDirection="column">
            {latest.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </Flex>
        </Flex> */}

        {/* <Flex flexDirection="column" w="full" mt="8">
          <HStack as={NextLink} href="/remote">
            <Heading size="md">🏝 Remote Jobs</Heading>
          </HStack>
          <Flex flexDirection="column">
            {remote.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </Flex>
          <Flex mt="2" justifyContent="center">
            <Button
              fontSize="sm"
              colorScheme="gray"
              variant="solid"
              onClick={() => router.push("/remote")}
            >
              Show more
            </Button>
          </Flex>
        </Flex> */}
      </Flex>
    </div>
  );
}

export default Search;
