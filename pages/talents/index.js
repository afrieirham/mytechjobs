import React from "react";
import Head from "next/head";
import NextLink from "next/link";
import { Tag } from "@chakra-ui/tag";
import { Button } from "@chakra-ui/button";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/layout";

const dataUrl = "https://kerja-it-talents.vercel.app/talents";

export const getStaticProps = async () => {
  const devs = await fetch(dataUrl).then((res) => res.json());

  return {
    props: {
      devs,
    },
    // revalidate every 1 minute
    revalidate: 60 * 1,
  };
};

function Talents({ devs }) {
  const title = "Hire Developers with Kerja IT";
  const siteDescription = "Hire developers from Malaysia with Kerja IT";

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={siteDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content="https://kerja-it.com/og.png" />
        <meta property="og:url" content="https://kerja-it.com/talents" />
        <meta property="og:site_name" content="Talents | Kerja IT" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex flexDirection="column" maxW="2xl" mx="auto" p="4">
        <Flex flexDirection="column" w="full" alignItems="center" mt="4">
          <Heading size="lg">Hire developers with Kerja IT</Heading>
        </Flex>
        <Flex justifyContent="flex-end" mt="4">
          <Button
            variant="ghost"
            as="a"
            href="/connect"
            target="_blank"
            w={{ base: "full", md: "auto" }}
          >
            Add my profile ✍️
          </Button>
        </Flex>
        <Box>
          {devs?.map((d) => {
            const activelyLooking = d["Are you actively looking?"] === "Yes";
            return (
              <LinkBox
                as={Flex}
                key={d.id}
                flexDirection="column"
                mt="2"
                p="4"
                borderWidth="1px"
                borderColor="gray.300"
                borderRadius="lg"
                bg="white"
              >
                <Flex justifyContent="space-between">
                  <NextLink href={`/talents/${d.id}`} legacyBehavior passHref>
                    <Text
                      as={LinkOverlay}
                      noOfLines="1"
                      fontWeight="bold"
                      fontSize="lg"
                    >
                      Developer {d.id}
                    </Text>
                  </NextLink>
                  {activelyLooking && (
                    <Tag size="sm" colorScheme="green">
                      Actively looking
                    </Tag>
                  )}
                </Flex>
                <Text
                  noOfLines={5}
                  fontFamily="sans-serif"
                  fontSize="sm"
                  mt="2"
                  color="gray.600"
                >
                  {d.Bio}
                </Text>
              </LinkBox>
            );
          })}
        </Box>
        <HStack maxW="2xl" mx="auto" p="8" justifyContent="center">
          <Link href="/connect" isExternal textAlign="center">
            You&apos;re a developer? Add your profile ✍️
          </Link>
        </HStack>
      </Flex>
    </div>
  );
}

export default Talents;
