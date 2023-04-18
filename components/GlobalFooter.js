import React from "react";
import { Flex, HStack, Link, Text } from "@chakra-ui/react";

function GlobalFooter() {
  const year = new Date().getFullYear();
  return (
    <Flex
      w="full"
      px="8"
      justifyContent="space-between"
      py="8"
      mx="auto"
      color="gray.500"
      fontSize="sm"
    >
      <HStack spacing="6">
        <Text>Copyright {year} Kerja IT</Text>
        <Link href="https://github.com/afrieirham/mytechjobs" isExternal>
          Open-Source
        </Link>
      </HStack>

      <HStack spacing="6">
        <Link href="mailto:afrie@kerja-it.com" isExternal>
          Email
        </Link>
        <Link href="https://twitter.com/afrieirham_" isExternal>
          Twitter
        </Link>
      </HStack>
    </Flex>
  );
}

export default GlobalFooter;
