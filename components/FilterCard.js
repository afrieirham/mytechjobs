import {
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

import { frameworks, places } from "../constants/paths";
import FlagIcon from "./FlagIcon";
import TechIcon from "./TechIcon";

function FilterCard({ techGetCheckboxProps, locationGetCheckboxProps }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        position="fixed"
        bottom="0"
        onClick={onOpen}
        width="full"
        colorScheme="blue"
        borderRadius="0"
        size="lg"
      >
        Filter
      </Button>
      <Drawer onClose={onClose} isOpen={isOpen} size="md" placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader as={Heading} size="md">
            🔍 Filter Jobs
          </DrawerHeader>
          <DrawerBody>
            <Heading size="sm">By Tech ⚡️</Heading>

            <Flex flexDirection="column">
              {frameworks.map((f, i) => (
                <Checkbox
                  key={i}
                  mt="4"
                  {...techGetCheckboxProps({ value: f })}
                >
                  <HStack>
                    <TechIcon name={f} size="18px" />
                    <Text as="span" size="sm" textTransform="capitalize">
                      {f.replaceAll("-", " ")}
                    </Text>
                  </HStack>
                </Checkbox>
              ))}
            </Flex>

            <Heading size="sm" mt="16">
              By Location 📍
            </Heading>

            <Flex flexDirection="column" mb="8">
              {places.map((f, i) => (
                <Checkbox
                  key={i}
                  mt="4"
                  {...locationGetCheckboxProps({ value: f })}
                >
                  <HStack>
                    <FlagIcon name={f} size="24px" />
                    <Text as="span" size="sm" textTransform="capitalize">
                      {f.replaceAll("-", " ")}
                    </Text>
                  </HStack>
                </Checkbox>
              ))}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default FilterCard;
