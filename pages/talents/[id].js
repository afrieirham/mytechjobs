import React from "react";
import Head from "next/head";
import NextLink from "next/link";
import fetch from "node-fetch";
import { Tag } from "@chakra-ui/tag";
import { Button } from "@chakra-ui/button";
import { Flex, Heading, Link, Stack, Text } from "@chakra-ui/layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/breadcrumb";

const dataUrl = "https://kerja-it-talents.vercel.app/talents";

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const profile = await fetch(`${dataUrl}/${id}`).then((res) => res.json());

  return {
    props: {
      profile,
    },
    // revalidate every 1 minute
    revalidate: 60 * 1,
  };
};

export async function getStaticPaths() {
  const profile = await fetch(dataUrl).then((res) => res.json());
  const paths = profile.map(({ id }) => ({ params: { id: String(id) } }));

  return {
    paths,
    fallback: true,
  };
}

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

function Profile({ profile }) {
  const hasProfile = Object.keys(profile ?? {}).length > 0;
  const title = profile
    ? `Developer ${profile.id} | Kerja IT`
    : "Developer Not Found | Kerja IT";
  const activelyLooking = profile?.["Are you actively looking?"] === "Yes";

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
            <BreadcrumbLink href={`/talents/${profile.id}`}>
              Developer {profile.id}
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
          <Flex w="full" justifyContent="space-between">
            <Heading size="lg">Developer {profile.id}</Heading>
            {activelyLooking && (
              <Tag size="sm" colorScheme="green">
                Actively looking
              </Tag>
            )}
          </Flex>
          <Stack alignItems="flex-start" spacing="6" mt="6">
            <HireMeButton />
            <Flex flexDirection="column">
              <Text fontSize="sm" fontWeight="bold">
                Available date:
              </Text>
              <Text>{profile["Available to start on"]} </Text>
            </Flex>
            <Flex flexDirection="column">
              <Text fontSize="sm" fontWeight="bold">
                Available in:
              </Text>
              <Text>{profile["Work location"]}</Text>
            </Flex>
            <Flex flexDirection="column">
              <Text fontSize="sm" fontWeight="bold">
                Looking for:
              </Text>
              <Text>{profile["Role Type"]}</Text>
            </Flex>
            <Flex flexDirection="column">
              <Text fontSize="sm" fontWeight="bold">
                Preferred position:
              </Text>
              <Text>{profile["Preferred Role"]}</Text>
            </Flex>
            <Flex flexDirection="column">
              <Text fontSize="sm" fontWeight="bold">
                Interested in role as:
              </Text>
              <Text>{profile["Role Level"]}</Text>
            </Flex>
            <Flex flexDirection="column">
              <Text fontSize="sm" fontWeight="bold">
                Remote:
              </Text>
              <Text>{profile["Are you open to remote job?"]}</Text>
            </Flex>
            <Flex flexDirection="column">
              <Text fontSize="sm" fontWeight="bold">
                On-site:
              </Text>
              <Text>{profile["Are you open to on-site job?"]}</Text>
            </Flex>
            <Flex flexDirection="column">
              <Text fontSize="sm" fontWeight="bold">
                Skills:
              </Text>
              <Text>{profile["List down your skills "][" tech stacks"]}</Text>
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
                {profile["Bio"]}
              </Text>
            </Flex>
            <HireMeButton />
          </Stack>
        </Flex>
      )}
      <Stack maxW="2xl" mx="auto" p="8" justifyContent="center">
        <Link href="/connect" isExternal textAlign="center">
          You&apos;re a developer? Add your profile ✍️
        </Link>
      </Stack>
    </div>
  );
}

export default Profile;
