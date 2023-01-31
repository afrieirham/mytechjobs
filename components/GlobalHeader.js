import React from "react";
import {
  chakra,
  HStack,
  Link,
  Flex,
  IconButton,
  useColorModeValue,
  useDisclosure,
  CloseButton,
  VStack,
  Button,
  Spacer,
} from "@chakra-ui/react";

import { AiOutlineMenu } from "react-icons/ai";
import Image from "next/image";
import NextLink from "next/link";

const GlobalHeader = () => {
  const bg = useColorModeValue("white", "gray.800");
  const ref = React.useRef(null);
  const cl = useColorModeValue("gray.800", "white");
  const mobileNav = useDisclosure();

  const MobileNavContent = (
    <VStack
      position="absolute"
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? "flex" : "none"}
      flexDirection="column"
      p={2}
      pb={4}
      m={2}
      bg={bg}
      spacing={3}
      rounded="sm"
      shadow="sm"
      zIndex="toast"
    >
      <CloseButton
        w="full"
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={mobileNav.onClose}
        variant="ghost"
      />
      <Button w="full" variant="ghost" as={NextLink} href="/">
        🏠 Home
      </Button>
      <Button w="full" variant="ghost" as={NextLink} href="/jobs">
        🔍 Search Jobs
      </Button>
      <Button
        display="inline-flex"
        w="full"
        variant="ghost"
        as={NextLink}
        href="/jobs?location=remote"
      >
        🏝 Remote Jobs
      </Button>
      <Button
        w="full"
        display="inline-flex"
        variant="ghost"
        as="a"
        href="https://hire.kerja-it.com"
      >
        📢 Post Jobs
      </Button>
      <Button
        display="inline-flex"
        w="full"
        as="a"
        colorScheme="messenger"
        href="https://forms.gle/87gwhwGRxBKom6gSA"
        target="_blank"
      >
        Get Job Alerts 💌
      </Button>
    </VStack>
  );

  return (
    <React.Fragment>
      <chakra.header
        ref={ref}
        transition="box-shadow 0.2s"
        bg={bg}
        w="full"
        overflowY="hidden"
      >
        <chakra.div h="4.5rem" mx="auto" maxW="1200px">
          <Flex
            w="full"
            h="full"
            px="6"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex align="flex-start" mr="6">
              <Link href="/">
                <HStack>
                  <Image
                    alt="Kerja IT logo"
                    src="/logo.png"
                    width={150}
                    height={31}
                  />
                </HStack>
              </Link>
            </Flex>
            <Flex>
              <HStack spacing="2" display={{ base: "none", md: "flex" }}>
                <Button as={NextLink} href="/jobs" variant="ghost">
                  🔍 Search Jobs
                </Button>
                <Button
                  as={NextLink}
                  href="/jobs?location=remote"
                  variant="ghost"
                >
                  🏝 Remote Jobs
                </Button>
              </HStack>
            </Flex>
            <Spacer />
            <HStack display={{ base: "none", md: "flex" }} spacing="4">
              <Button as="a" href="https://hire.kerja-it.com" variant="ghost">
                📢 Post Jobs
              </Button>
              <Button
                as="a"
                colorScheme="messenger"
                href="https://forms.gle/87gwhwGRxBKom6gSA"
                target="_blank"
              >
                Get Job Alerts 💌
              </Button>
            </HStack>
            <Flex justify="flex-end" align="center">
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{ color: "inherit" }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />
            </Flex>
          </Flex>
          {MobileNavContent}
        </chakra.div>
      </chakra.header>
    </React.Fragment>
  );
};
export default GlobalHeader;
