import { Flex, Stack } from "@chakra-ui/react";
import React from "react";

function SectionContainer({ children, outerContainerProps, ...props }) {
  return (
    <Flex
      bg="white"
      mx="auto"
      maxW="2xl"
      flexDirection="column"
      mt={{ base: "8", md: "4" }}
      p={{ base: "4", md: "8" }}
      borderColor="gray.300"
      borderWidth={{ base: "1px 0", md: "1px" }}
      borderRadius={{ base: "none", md: "lg" }}
      {...outerContainerProps}
    >
      <Stack direction="column" spacing="6" {...props}>
        {children}
      </Stack>
    </Flex>
  );
}

export default SectionContainer;
