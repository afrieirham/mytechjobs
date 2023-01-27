import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import React from "react";

import GlobalHeader from "../../components/GlobalHeader";

function ThankYou() {
  return (
    <Box>
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
          <Link href="mailto:afrieirham.work@gmail.com" target="_blank">
            afrieirham.work@gmail.com
          </Link>
        </Text>
      </Flex>
    </Box>
  );
}

export default ThankYou;
