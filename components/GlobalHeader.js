import React from "react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { signOut } from "supertokens-auth-react/recipe/emailpassword";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";

const GlobalHeader = () => {
  const router = useRouter();
  const ref = React.useRef(null);
  const mobileNav = useDisclosure();

  const sessionContext = useSessionContext();
  const { doesSessionExist, accessTokenPayload } = sessionContext;
  const name = accessTokenPayload?.first_name ?? "User";

  const onLogout = async () => {
    router.push("/");
    await signOut();
  };

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
        as="a"
        href="/alerts"
        target="_blank"
      >
        💌 Get Job Alerts
      </Button>
      <Button
        w="full"
        display="inline-flex"
        variant="ghost"
        as="a"
        href="/hire"
      >
        📢 Post Jobs
      </Button>
      <Button
        display="inline-flex"
        w="full"
        as="a"
        colorScheme="messenger"
        href="/connect"
        target="_blank"
      >
        Let employers find me 🤝
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
            {!doesSessionExist && (
              <>
                <Button variant="ghost" as="a" href="/auth?show=signin">
                  Login
                </Button>
                <Button as="a" href="/auth?show=signup">
                  Register
                </Button>
              </>
            )}
            {doesSessionExist && (
              <Menu placement="bottom-end">
                <MenuButton as={Button}>{name}</MenuButton>
                <MenuList>
                  <MenuItem as={NextLink} href="/profile">
                    Developer Profile
                  </MenuItem>
                  <MenuItem as={NextLink} href="/account">
                    Account Settings
                  </MenuItem>
                  <MenuItem onClick={onLogout}>Sign Out</MenuItem>
                </MenuList>
              </Menu>
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
