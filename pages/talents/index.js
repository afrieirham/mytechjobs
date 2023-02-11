import Head from "next/head";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/layout";

import GlobalHeader from "../../components/GlobalHeader";
import { Tag } from "@chakra-ui/tag";
import { fetcher } from "../../helpers/fetcher";

const dataUrl = "https://kerja-it-talents.vercel.app/talents";

function Talents() {
  const [devs, setDevs] = useState([]);

  const title = "Hire Developers with Kerja IT";
  const siteDescription = "";

  useEffect(() => {
    const fetch = async () => {
      const data = await fetcher(dataUrl);
      setDevs(data);
    };

    fetch();
  }, []);

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
      <GlobalHeader />
      <Flex flexDirection="column" maxW="2xl" mx="auto" p="4">
        <Flex flexDirection="column" w="full" alignItems="center" mt="4">
          <Heading size="lg">Hire developers with Kerja IT</Heading>
        </Flex>
        <Box mt="4">
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
      </Flex>
    </div>
  );
}

export default Talents;
