import React from "react";
import Head from "next/head";
import fetch from "node-fetch";
import { Tag } from "@chakra-ui/tag";
import { Button } from "@chakra-ui/button";
import { Flex, Heading, HStack, Link, Text, VStack } from "@chakra-ui/layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/breadcrumb";

import GlobalHeader from "../../components/GlobalHeader";
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
    fallback: false,
  };
}

function HireMeButton() {
  return (
    <Button
      as="a"
      target="_blank"
      w={{ base: "full", lg: "200px" }}
      href="https://buy.stripe.com/9AQ17E1Sx1CMckE9AA"
    >
      Hire me 💼
    </Button>
  );
}

function Profile({ profile }) {
  const { id } = profile;
  const title = `Developer ${id} | Kerja IT`;
  const activelyLooking = profile["Are you actively looking?"] === "Yes";

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <GlobalHeader />
      <Breadcrumb mt="8" maxW="2xl" mb="4" mx={{ base: "4", md: "auto" }}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/talents">Talents</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href={`/talents/${id}`}>
            Developer {id}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
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
          <Heading size="lg">Developer {id}</Heading>
          {activelyLooking && (
            <Tag size="sm" colorScheme="green">
              Actively looking
            </Tag>
          )}
        </Flex>
        <VStack alignItems="flex-start" spacing="6" mt="6">
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
        </VStack>
      </Flex>
      <HStack maxW="2xl" mx="auto" p="8" justifyContent="center">
        <Link href="/connect" isExternal>
          You&apos;re a developer? Add your profile ✍️
        </Link>
      </HStack>
    </div>
  );
}

export default Profile;
