import React from "react";
import NextLink from "next/link";
import { format } from "date-fns";
import {
  Badge,
  Flex,
  HStack,
  LinkBox,
  LinkOverlay,
  Tag,
  Text,
} from "@chakra-ui/react";

import { checkIfToday } from "../helpers/checkIfToday";
import PinIcon from "../icons/PinIcon";
import CalendarIcon from "../icons/CalendarIcon";

function JobListing({ job }) {
  const isToday = checkIfToday(job?.schema?.datePosted ?? job?.createdAt);

  const companyName = job?.schema?.hiringOrganization?.name;
  const datePosted = job?.schema?.datePosted;
  const jobLocation =
    job?.schema?.jobLocation?.address?.stressAddress ||
    job?.schema?.jobLocation?.address?.addressLocality ||
    job?.schema?.jobLocation?.address?.addressRegion;

  return (
    <LinkBox
      as={Flex}
      flexDirection="column"
      mt="2"
      p="4"
      borderWidth="1px"
      borderColor="gray.300"
      borderRadius="lg"
    >
      <HStack>
        <NextLink href={`/jobs/${job.slug}`} legacyBehavior passHref>
          <Text as={LinkOverlay} noOfLines="1" fontWeight="bold">
            {job?.schema?.title}
          </Text>
        </NextLink>

        {isToday && <Badge colorScheme="green">New</Badge>}
      </HStack>
      <Flex flexDirection="column" fontSize="sm" color="gray.600">
        {companyName && <Text>{companyName}</Text>}
        <HStack mt="2">
          <PinIcon />
          <Text>{jobLocation ?? "Unspecified"}</Text>
        </HStack>
        <HStack>
          <CalendarIcon />
          <Text>
            {datePosted
              ? "Posted on " + format(new Date(datePosted), "do MMM yyyy")
              : "Unspecified"}
          </Text>
          {isToday && <Badge colorScheme="green">New</Badge>}
        </HStack>
      </Flex>
      <HStack mt="4">
        {job?.keywords.map((keyword) => (
          <Tag key={keyword} size="sm" colorScheme="blackAlpha">
            {keyword}
          </Tag>
        ))}
      </HStack>
    </LinkBox>
  );
}

export default JobListing;
