import { Flex, HStack, Link, Tag, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import React from "react";

function JobListing({ job }) {
  const hasCompanyDetails = Boolean(job?.schema?.hiringOrganization?.name);
  const description = job?.schema?.description || job?.schema?.metaDescription;

  return (
    <Flex
      key={job.id}
      flexDirection="column"
      mt="2"
      p="4"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="lg"
    >
      <Link isExternal href={job.link} color="blue.500" fontWeight="bold">
        {job?.schema?.title}
      </Link>
      {hasCompanyDetails && (
        <Text fontSize="sm" color="gray.600" textTransform="capitalize">
          {job?.schema?.hiringOrganization?.name?.toLowerCase()} @{" "}
          {job?.schema?.jobLocation?.address?.streetAddress?.toLowerCase() ||
            job?.schema?.jobLocation?.address?.addressLocality?.toLowerCase()}
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
          <Tag key={keyword} size="sm">
            {keyword}
          </Tag>
        ))}
      </HStack>
    </Flex>
  );
}

export default JobListing;
