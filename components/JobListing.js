import { Badge, Flex, HStack, Link, Tag, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import React from "react";

import { checkIfToday } from "../helpers/checkIfToday";

function JobListing({ job }) {
  const hasCompanyDetails = Boolean(job?.schema?.hiringOrganization?.name);
  const description = job?.schema?.description || job?.schema?.metaDescription;
  const isToday = checkIfToday(job.createdAt);

  return (
    <Flex
      flexDirection="column"
      mt="2"
      p="4"
      borderWidth="1px"
      borderColor="gray.300"
      borderRadius="lg"
    >
      <HStack>
        <Link href={`/jobs/${job.slug}`} fontWeight="bold" noOfLines="1">
          {job?.schema?.title}
        </Link>
        {isToday && <Badge colorScheme="green">New</Badge>}
      </HStack>
      {hasCompanyDetails && (
        <Text fontSize="sm" color="gray.600">
          {job?.schema?.hiringOrganization?.name} @{" "}
          {job?.schema?.jobLocation?.address?.addressRegion ||
            job?.schema?.jobLocation?.address?.addressLocality}
        </Text>
      )}
      {!hasCompanyDetails && (
        <Text fontSize="sm" color="gray.600" textTransform="capitalize">
          {description}
        </Text>
      )}
      <Text fontSize="xs" color="gray.500">
        {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
      </Text>
      <HStack mt="2">
        {job?.keywords.map((keyword) => (
          <Tag key={keyword} size="sm" colorScheme="blackAlpha">
            {keyword}
          </Tag>
        ))}
      </HStack>
    </Flex>
  );
}

export default JobListing;
