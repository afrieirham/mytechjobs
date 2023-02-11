import React from "react";
import Head from "next/head";
import fetch from "node-fetch";
import { Tag } from "@chakra-ui/tag";
import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/layout";

import GlobalHeader from "../../components/GlobalHeader";
import { Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/breadcrumb";

const dataUrl = "https://kerja-it-talents.vercel.app/talents/";

export const getStaticProps = async (context) => {
  const { id } = context.params;
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
        <TableContainer fontSize="sm" borderRadius="md" mt="4">
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>Available date:</Td>
                <Td>
                  {profile["Available to start on"]}{" "}
                  {activelyLooking && (
                    <Tag size="sm" colorScheme="green">
                      Actively looking
                    </Tag>
                  )}
                </Td>
              </Tr>
              <Tr>
                <Td>Can work in:</Td>
                <Td>{profile["Work location"]}</Td>
              </Tr>
              <Tr>
                <Td>Looking for:</Td>
                <Td>{profile["Role Type"]}</Td>
              </Tr>
              <Tr>
                <Td>Preferred role:</Td>
                <Td>{profile["Preferred Role"]}</Td>
              </Tr>
              <Tr>
                <Td>Interested in:</Td>
                <Td>{profile["Role Level"]}</Td>
              </Tr>
              <Tr>
                <Td>Remote:</Td>
                <Td>{profile["Are you open to remote job?"]}</Td>
              </Tr>
              <Tr>
                <Td>On-site:</Td>
                <Td>{profile["Are you open to on-site job?"]}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <Flex flexDirection="column" mt="4">
          <Text>Skills:</Text>
          <Text fontSize="sm" fontFamily="sans-serif">
            {profile["List down your skills "][" tech stacks"]}
          </Text>
          <Text mt="8">Profile:</Text>
          <Text fontSize="sm" fontFamily="sans-serif" whiteSpace="pre-wrap">
            {profile["Bio"]}
          </Text>
        </Flex>
      </Flex>
    </div>
  );
}

export default Profile;
