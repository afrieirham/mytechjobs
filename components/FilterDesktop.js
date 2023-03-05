import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import Filters from "./Filters";

function FilterDesktop(props) {
  return (
    <Flex
      display={{ base: "none", xl: "block" }}
      position="absolute"
      w="250px"
      top="100"
      right="-250"
      flexDirection="column"
      justifyContent="center"
    >
      <Flex
        p="4"
        bg="white"
        borderWidth="1px"
        borderColor="gray.300"
        borderRadius="lg"
        flexDirection="column"
        mb="32"
      >
        <Filters {...props} />
      </Flex>
    </Flex>
  );
}

export default FilterDesktop;
