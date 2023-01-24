import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import Filters from "./Filters";

function FilterDesktop(props) {
  return (
    <Flex
      display={{ base: "none", xl: "block" }}
      position="absolute"
      w="250px"
      top="0"
      flexDirection="column"
      mt="100px"
      ml="40px"
      justifyContent="center"
    >
      <Flex
        p="4"
        bg="white"
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="lg"
        flexDirection="column"
      >
        <Heading size="sm" mb="4">
          🔍 Filter Jobs
        </Heading>
        <Filters {...props} />
      </Flex>
    </Flex>
  );
}

export default FilterDesktop;
