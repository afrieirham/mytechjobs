import React from "react";
import Image from "next/image";
import NextLink from "next/link";
import {
  HStack,
  Link,
  Flex,
  IconButton,
  useDisclosure,
  CloseButton,
  VStack,
  Button,
  Spacer,
  Box,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/router";

const GlobalHeader = () => {
  const router = useRouter();
  const isHome = router.pathname === "/";

  const ref = React.useRef(null);
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
      bg="white"
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
      <Button
        onClick={mobileNav.onClose}
        w="full"
        variant="ghost"
        as={NextLink}
        href="/"
      >
        🏠 Home
      </Button>
      <Button
        onClick={mobileNav.onClose}
        w="full"
        variant="ghost"
        as="a"
        href="/hire"
      >
        📢 Post Jobs
      </Button>
      <Button
        onClick={mobileNav.onClose}
        display="inline-flex"
        w="full"
        variant="ghost"
        as="a"
        href="/alerts"
        target="_blank"
      >
        💌 Get Job Alerts
      </Button>
      <Button
        onClick={mobileNav.onClose}
        w="full"
        as="a"
        href="/connect"
        color="white"
        bg="gray.900"
        _hover={{ bg: "gray.700" }}
        _active={{ bg: "gray.700" }}
      >
        ✨ Register
      </Button>
    </VStack>
  );

  return (
    <Box
      as="header"
      ref={ref}
      transition="box-shadow 0.2s"
      bg="white"
      w="full"
      overflowY="hidden"
    >
      <Box h="4.5rem" mx="auto" maxW="1200px">
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
          <Spacer />
          <HStack display={{ base: "none", md: "flex" }} spacing="2">
            <Button as="a" href="/hire" variant="ghost">
              📢 Post Jobs
            </Button>
            <Button as="a" href="/alerts" variant="ghost" target="_blank">
              💌 Get Job Alerts
            </Button>
            {isHome ? (
              <Button
                as="a"
                href="/connect"
                _hover={{ bg: "gray.900", color: "white" }}
                _active={{ bg: "gray.900", color: "white" }}
                variant="outline"
              >
                ✨ Register
              </Button>
            ) : (
              <Button
                as="a"
                href="/connect"
                color="white"
                bg="gray.900"
                _hover={{ bg: "gray.700" }}
                _active={{ bg: "gray.700" }}
              >
                ✨ Register
              </Button>
            )}
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
      </Box>
    </Box>
  );
};
export default GlobalHeader;
