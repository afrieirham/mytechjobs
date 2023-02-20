import { Flex, Stack } from "@chakra-ui/react";
import React from "react";

function SectionContainer({ children, outerContainerProps, ...props }) {
  return (
    <Flex
      mt="4"
      flexDirection="column"
      maxW="2xl"
      mx="auto"
      p={{ base: "4", md: "8" }}
      bg="white"
      borderWidth={{ base: "none", md: "1px" }}
      borderColor="gray.300"
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
