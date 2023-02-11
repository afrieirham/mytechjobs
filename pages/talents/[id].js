import React from "react";
import Head from "next/head";
import fetch from "node-fetch";
import { Tag } from "@chakra-ui/tag";
import { Flex, Heading, Text, VStack } from "@chakra-ui/layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/breadcrumb";

import GlobalHeader from "../../components/GlobalHeader";

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const dataUrl = "https://kerja-it-talents.vercel.app/talents/";
  const profile = await fetch(dataUrl + id).then((res) => res.json());

  return {
    props: {
      profile,
    },
    // revalidate every 1 hour
    revalidate: 60 * 60 * 1,
  };
};

export async function getStaticPaths() {
  const ids = [1, 2, 3, 4, 5, 6, 7].map(String);
  const paths = ids.map((id) => ({ params: { id } }));

  return {
    paths,
    fallback: false,
  };
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
        <Heading>Developer {id}</Heading>
        <VStack alignItems="flex-start" spacing="6" mt="4">
          <Flex flexDirection="column">
            <Text fontSize="sm" fontWeight="bold">
              Available date:
            </Text>
            <Text>
              {profile["Available to start on"]}{" "}
              {activelyLooking && (
                <Tag size="sm" colorScheme="green">
                  Actively looking
                </Tag>
              )}
            </Text>
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
              color="gray.600"
            >
              {profile["Bio"]}
            </Text>
          </Flex>
        </VStack>
      </Flex>
    </div>
  );
}

export default Profile;
