import React from "react";
import Head from "next/head";
import { Tag } from "@chakra-ui/tag";
import { Button } from "@chakra-ui/button";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/breadcrumb";
import useSWR from "swr";
import { useRouter } from "next/router";
import { fetcher } from "../../helpers/fetcher";
import { format } from "date-fns";

function HireMeButton() {
  return (
    <Button
      as="a"
      target="_blank"
      w={{ base: "full", md: "auto" }}
      href={process.env.NEXT_PUBLIC_SUBSCRIPTION_LINK}
      borderColor="gray.900"
      _hover={{ bg: "gray.900", color: "white" }}
      _active={{ bg: "gray.900", color: "white" }}
      variant="outline"
    >
      💼 Contact Developer
    </Button>
  );
}

function Profile() {
  const router = useRouter();
  const { data } = useSWR("/api/devs/" + router.query.id, fetcher);

  const hasProfile = Object.keys(data?.dev ?? {}).length > 0;
  const title = data?.dev
    ? `Developer ${data?.dev._id} | Kerja IT`
    : "Developer Not Found | Kerja IT";
  const activelyLooking = data?.dev?.status === "active";

  const formatArray = (array) =>
    array.map((a) => a.replaceAll("_", " ")).join(", ");

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      {hasProfile && (
        <Breadcrumb mt="8" maxW="2xl" mb="4" mx={{ base: "4", md: "auto" }}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/talents">Talents</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href={`/talents/${data?.dev?._id}`}>
              {data?.dev?.headline}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      )}
      {hasProfile && (
        <Flex
          flexDirection="column"
          maxW="2xl"
          mx="auto"
          p="4"
          bg="white"
          borderColor="gray.300"
          borderWidth={{ base: "none", md: "1px" }}
          borderRadius={{ base: "none", md: "lg" }}
          mt="4"
        >
          {activelyLooking && (
            <Box>
              <Tag size="sm" colorScheme="green">
                Actively looking
              </Tag>
            </Box>
          )}
          <Flex w="full" justifyContent="space-between">
            <Heading size="lg">{data?.dev?.headline}</Heading>
          </Flex>
          <VStack alignItems="flex-start" spacing="6" mt="6">
            <HireMeButton />
            <Flex flexDirection="column">
              <Text fontSize="sm" fontWeight="bold">
                Available date:
              </Text>
              <Text>
                {format(new Date(data?.dev?.availableDate), "do MMM yyyy")}
              </Text>
            </Flex>
            <Flex flexDirection="column">
              <Text fontSize="sm" fontWeight="bold">
                Available in:
              </Text>
              <Text textTransform="capitalize">
                {formatArray(data?.dev?.locations)}
              </Text>
            </Flex>
            <Flex flexDirection="column">
              <Text fontSize="sm" fontWeight="bold">
                Looking for:
              </Text>
              <Text textTransform="capitalize">
                {formatArray(data?.dev?.jobTypes)}
              </Text>
            </Flex>
            <Flex flexDirection="column">
              <Text fontSize="sm" fontWeight="bold">
                Preferred position:
              </Text>
              <Text textTransform="capitalize">
                {formatArray(data?.dev?.positions)}
              </Text>
            </Flex>
            <Flex flexDirection="column">
              <Text fontSize="sm" fontWeight="bold">
                Interested in role as:
              </Text>
              <Text textTransform="capitalize">
                {formatArray(data?.dev?.jobLevels)}
              </Text>
            </Flex>
            <Flex flexDirection="column">
              <Text fontSize="sm" fontWeight="bold">
                Work arrangements:
              </Text>
              <Text textTransform="capitalize">
                {formatArray(data?.dev?.arrangements)}
              </Text>
            </Flex>
            <Flex flexDirection="column">
              <Text fontSize="sm" fontWeight="bold">
                Profile:
              </Text>
              <Text
                fontFamily="sans-serif"
                whiteSpace="pre-wrap"
                fontSize="sm"
                color="gray.700"
              >
                {data?.dev?.bio}
              </Text>
            </Flex>
            <HireMeButton />
          </VStack>
        </Flex>
      )}
      <HStack maxW="2xl" mx="auto" p="8" justifyContent="center">
        <Link href="/connect" isExternal textAlign="center">
          You&apos;re a developer? Add your profile ✍️
        </Link>
      </HStack>
    </div>
  );
}

export default Profile;
