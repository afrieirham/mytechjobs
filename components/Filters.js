import React from "react";
import { Checkbox, Flex, Heading, HStack, Text } from "@chakra-ui/react";

import { frameworks, places } from "../constants/paths";
import FlagIcon from "./FlagIcon";
import TechIcon from "./TechIcon";

function Filters({ techGetCheckboxProps, locationGetCheckboxProps }) {
  return (
    <>
      <Heading size="xs">By Tech ⚡️</Heading>

      <Flex flexDirection="column">
        {frameworks.map((f, i) => (
          <Checkbox key={i} mt="4" {...techGetCheckboxProps({ value: f })}>
            <HStack>
              <TechIcon name={f} size="18px" />
              <Text as="span" size="sm" textTransform="capitalize">
                {f.replaceAll("-", " ")}
              </Text>
            </HStack>
          </Checkbox>
        ))}
      </Flex>

      <Heading size="xs" mt="16">
        By Location 📍
      </Heading>

      <Flex flexDirection="column" mb={{ base: "16", xl: "0" }}>
        {places.map((f, i) => (
          <Checkbox key={i} mt="4" {...locationGetCheckboxProps({ value: f })}>
            <HStack>
              <FlagIcon name={f} size="24px" />
              <Text as="span" size="sm" textTransform="capitalize">
                {f.replaceAll("-", " ")}
              </Text>
            </HStack>
          </Checkbox>
        ))}
      </Flex>
    </>
  );
}

export default Filters;
