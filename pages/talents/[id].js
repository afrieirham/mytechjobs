import React from "react";
import Head from "next/head";
import NextLink from "next/link";
import { Tag } from "@chakra-ui/tag";
import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/breadcrumb";
import useSWR from "swr";
import { useRouter } from "next/router";
import { fetcher } from "../../helpers/fetcher";
import { format } from "date-fns";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

function HireMeButton({ isOwnPage }) {
  if (isOwnPage) {
    return (
      <Button as={NextLink} href="/profile">
        📝 Edit Profile
      </Button>
    );
  }

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
  const { userId } = useSessionContext();
  const router = useRouter();
  const { data } = useSWR("/api/devs/" + router.query.id, fetcher);

  const hasProfile = Object.keys(data?.dev ?? {}).length > 0;
  const title = data?.dev
    ? `${data?.dev?.headline} | Kerja IT`
    : "Developer Not Found | Kerja IT";
  const description = data?.dev?.bio;
  const activelyLooking = data?.dev?.status === "active";
  const isOwnPage = userId === data?.dev?.superTokensId;

  const formatArray = (array) =>
    array.map((a) => a.replaceAll("_", " ")).join(", ");

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={title} />
        <meta property="og:description" content={description} />
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
      {!hasProfile && (
        <Flex
          flexDirection="column"
          maxW="2xl"
          mx="auto"
          p={{ base: "4", md: "0" }}
          textAlign="center"
          alignItems="center"
          mt="8"
        >
          <Heading size="md">😵‍💫 Opps...</Heading>
          <Heading size="sm" mt="2" color="gray.600">
            Can&apos;t find the candidate you&apos;re looking for.
          </Heading>
          <Stack direction="column" mt="8">
            <Button href="/talents" as={NextLink}>
              Find other candidates 🔎
            </Button>
          </Stack>
        </Flex>
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
          <Stack alignItems="flex-start" spacing="6" mt="6">
            <HireMeButton isOwnPage={isOwnPage} />
            <Flex flexDirection="column">
              <Text fontSize="sm" fontWeight="bold">
                Available date:
              </Text>
              <Text>
                {data?.dev?.availableDate &&
                  format(new Date(data?.dev?.availableDate), "do MMM yyyy")}
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
          </Stack>
        </Flex>
      )}
      <Stack maxW="2xl" mx="auto" p="8" justifyContent="center">
        <Link href="/profile" isExternal textAlign="center">
          You&apos;re a developer? Add your profile ✍️
        </Link>
      </Stack>
    </div>
  );
}

export default Profile;
