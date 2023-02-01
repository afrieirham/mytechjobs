import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

import { siteDescription } from "../../constants/SEO";
import GlobalHeader from "../../components/GlobalHeader";

function ThankYou() {
  const title = "Thank You For You Purchase 🥳 | Kerja IT";
  return (
    <Box>
      <Head>
        <title>{title}</title>
        <meta name="description" content={siteDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:url" content="https://kerja-it.com" />
        <meta property="og:site_name" content="Kerja IT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalHeader />
      <Flex
        px="4"
        h="80vh"
        mx="auto"
        maxW="2xl"
        textAlign="center"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading>Thank You For You Purchase 🥳</Heading>
        <Heading size={{ base: "xs", sm: "sm" }} color="gray.600" mt="2">
          ✍️ Posting job listing are still in development. We will let you know
          when it goes live within 24 to 48 hours.
        </Heading>
        <Text fontSize="sm" mt="8">
          If you have any questions, feel free to contact me at{" "}
          <Link href="mailto:admin@kerja-it.com" target="_blank">
            admin@kerja-it.com
          </Link>
        </Text>
      </Flex>
    </Box>
  );
}

export default ThankYou;
