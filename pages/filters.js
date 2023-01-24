import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  HStack,
  Link,
  ListItem,
  UnorderedList,
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

        <Flex mt="4" id="tech">
          <Heading size="md" textTransform="capitalize">
            Browse By Tech ⚡️
          </Heading>
        </Flex>

        <Flex mt="2">
          <Flex flexDirection="column">
            {frameworks.map((f, i) => (
              <Flex key={i}>
                <HStack>
                  <TechIcon name={f} size="15px" />
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

        <Flex mt="6" id="location">
          <Heading size="md" textTransform="capitalize">
            Browse By Location 📍
          </Heading>
        </Flex>

        <Flex mt="2">
          <Flex flexDirection="column">
            {places.map((f, i) => (
              <Flex key={i}>
                <HStack>
                  <FlagIcon name={f} size="15px" />
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
      </Flex>
    </div>
  );
}

export default Filters;
