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

import { checkIfThisWeek } from "../helpers/checkIfThisWeek";
import PinIcon from "../icons/PinIcon";
import CalendarIcon from "../icons/CalendarIcon";

function JobListing({ job }) {
  const thisWeek = checkIfThisWeek(job?.schema?.datePosted ?? job?.createdAt);

  const companyName = job?.schema?.hiringOrganization?.name;
  const datePosted = job?.postedAt;
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
      bg="white"
    >
      <HStack>
        <NextLink href={`/jobs/${job.slug}`} legacyBehavior passHref>
          <Text as={LinkOverlay} noOfLines="1" fontWeight="bold">
            {job?.schema?.title}
          </Text>
        </NextLink>

        {thisWeek && <Badge colorScheme="green">New</Badge>}
      </HStack>
      <Flex flexDirection="column" fontSize="sm" color="gray.600">
        {companyName && <Text>{companyName}</Text>}
        <HStack mt="2">
          <PinIcon />
          <Text noOfLines="1">{jobLocation ?? "Unspecified"}</Text>
        </HStack>
        <HStack>
          <CalendarIcon />
          <Text>
            {datePosted
              ? "Posted on " + format(new Date(datePosted), "do MMM yyyy")
              : "Unspecified"}
          </Text>
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
