import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  HStack,
  Link,
} from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import FlagIcon from "../components/FlagIcon";
import TechIcon from "../components/TechIcon";
import { frameworks, places } from "../constants/paths";

import { sites } from "../constants/sites";

function Filters({}) {
  return (
    <div>
      <Head>
        <title>Malaysia Tech Jobs 🇲🇾</title>
        <meta
          name="description"
          content={`Daily tech jobs sourced from ${sites.join(", ")}.`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex flexDirection="column" maxW="2xl" mx="auto" p="4" mb="8">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink
              href="/filters"
              textTransform="capitalize"
              isCurrentPage
            >
              Filters
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Flex mt="8" id="tech">
          <Heading size="md" textTransform="capitalize">
            Browse By Tech ⚡️
          </Heading>
        </Flex>

        <Flex mt="2">
          <Flex flexDirection="column">
            {frameworks.map((f, i) => (
              <Flex key={i} mt={{ base: "6", md: "4" }}>
                <HStack>
                  <TechIcon name={f} size="18px" />
                  <Link
                    href={`/${f}`}
                    color="blue.500"
                    textTransform="capitalize"
                  >
                    {f.replaceAll("-", " ")}
                  </Link>
                </HStack>
              </Flex>
            ))}
          </Flex>
        </Flex>

        <Flex mt="16" id="location">
          <Heading size="md" textTransform="capitalize">
            Browse By Location 📍
          </Heading>
        </Flex>

        <Flex mt="2">
          <Flex flexDirection="column" w="full">
            {places.map((f, i) => (
              <Flex key={i} mt={{ base: "6", md: "4" }}>
                <HStack w="full">
                  <FlagIcon name={f} size="24px" />
                  <Link
                    href={`/${f}`}
                    color="blue.500"
                    textTransform="capitalize"
                    w="full"
                  >
                    {f.replaceAll("-", " ")}
                  </Link>
                </HStack>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}

export default Filters;
