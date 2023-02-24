import React from "react";
import Head from "next/head";
import NextLink from "next/link";
import { Tag } from "@chakra-ui/tag";
import { Button } from "@chakra-ui/button";
import {
  Box,
  Flex,
  Heading,
  Link,
  LinkBox,
  LinkOverlay,
  Stack,
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
  const title = "Talents | Kerja IT";
  const siteDescription = "Hire developers from Malaysia with Kerja IT";

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={siteDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content="https://kerja-it.com/talents.png" />
        <meta property="og:url" content="https://kerja-it.com/talents" />
        <meta property="og:site_name" content="Talents | Kerja IT" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex flexDirection="column" maxW="2xl" mx="auto" p="4">
        <Flex
          flexDirection="column"
          w="full"
          alignItems="center"
          textAlign="center"
          mt="4"
        >
          <Heading>Hire Developers in Malaysia 🇲🇾</Heading>
          <Text color="gray.600">
            Why wait for candidates to apply? Connect with them today!
          </Text>
        </Flex>
        <Stack direction="column" align="center" mt="8">
          <Stack direction={{ base: "column", md: "row" }}>
            <Button
              as="a"
              target="_blank"
              href={process.env.NEXT_PUBLIC_SUBSCRIPTION_LINK}
              color="white"
              bg="gray.900"
              _hover={{ bg: "gray.700" }}
              _active={{ bg: "gray.700" }}
            >
              🤝 Get access to developers today
            </Button>
          </Stack>
        </Stack>
        <Box mt="8">
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
        <Stack maxW="2xl" mx="auto" p="8" justifyContent="center">
          <Link href="/connect" isExternal textAlign="center">
            You&apos;re a developer? Add your profile ✍️
          </Link>
        </Stack>
      </Flex>
    </div>
  );
}

export default Talents;
