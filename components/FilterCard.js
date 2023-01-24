import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

import Filters from "./Filters";

function FilterCard(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        display={{ base: "block", xl: "none" }}
        position="fixed"
        bottom="0"
        onClick={onOpen}
        width="full"
        colorScheme="messenger"
        borderRadius="0"
        size="lg"
        fontSize="sm"
      >
        Filter
      </Button>

      <Drawer onClose={onClose} isOpen={isOpen} placement="bottom" size="full">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader as={Heading} size="md">
            🔍 Filter Jobs
          </DrawerHeader>
          <DrawerBody>
            <Filters {...props} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default FilterCard;
