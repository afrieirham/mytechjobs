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
  Button,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Stack,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";

const GlobalHeader = () => {
  const router = useRouter();
  const isHome = router.pathname === "/";
  const isTalents = router.pathname.includes("/talents");

  const ref = React.useRef(null);
  const mobileNav = useDisclosure();

  const sessionContext = useSessionContext();
  const { doesSessionExist, accessTokenPayload } = sessionContext;
  const name = accessTokenPayload?.first_name ?? "User";

  const onLogout = async () => {
    router.push("/");
    await signOut();
    mobileNav.onClose();
  };

  const MobileNavContent = (
    <Stack
      direction="column"
      position="absolute"
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? "flex" : "none"}
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
      {!isTalents && (
        <Button
          onClick={mobileNav.onClose}
          w="full"
          variant="ghost"
          as={NextLink}
          href="/talents"
        >
          🏹 Talents
        </Button>
      )}
      {!isTalents && (
        <Button
          onClick={mobileNav.onClose}
          w="full"
          variant="ghost"
          as="a"
          href="/hire"
        >
          📢 Post Jobs
        </Button>
      )}
      {!doesSessionExist && (
        <>
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
            variant="ghost"
            as="a"
            href="/auth?show=signin"
          >
            ☁️ Login
          </Button>

          <Button
            onClick={mobileNav.onClose}
            w="full"
            as="a"
            href="/profile"
            color="white"
            bg="gray.900"
            _hover={{ bg: "gray.700" }}
            _active={{ bg: "gray.700" }}
          >
            ✨ Register
          </Button>
        </>
      )}
      {doesSessionExist && (
        <>
          {!isTalents && (
            <Button
              onClick={mobileNav.onClose}
              variant="ghost"
              w="full"
              as={NextLink}
              href="/jobs"
            >
              🔍 Search Jobs
            </Button>
          )}
          <Button
            onClick={mobileNav.onClose}
            variant="ghost"
            w="full"
            as={NextLink}
            href="/profile"
          >
            📝 My Profile
          </Button>
          <Button
            onClick={mobileNav.onClose}
            variant="ghost"
            w="full"
            as={NextLink}
            href="/account"
          >
            ⚙️ Account
          </Button>
          <Button variant="ghost" w="full" onClick={onLogout}>
            🚶🏻‍♂️ Sign Out
          </Button>
        </>
      )}
    </Stack>
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
            {!isTalents && (
              <Button as={NextLink} href="/talents" variant="ghost">
                🏹 Talents
              </Button>
            )}
            <Button as="a" href="/hire" variant="ghost">
              📢 Post Jobs
            </Button>
            {!doesSessionExist && (
              <>
                {!isTalents && (
                  <Button as="a" href="/alerts" variant="ghost" target="_blank">
                    💌 Get Job Alerts
                  </Button>
                )}
                {!isTalents && (
                  <Button variant="ghost" as="a" href="/auth?show=signin">
                    ☁️ Login
                  </Button>
                )}
                {isHome ? (
                  <Button
                    as="a"
                    href="/profile"
                    _hover={{ bg: "gray.900", color: "white" }}
                    _active={{ bg: "gray.900", color: "white" }}
                    variant="outline"
                  >
                    ✨ Register
                  </Button>
                ) : !isTalents ? (
                  <Button
                    as="a"
                    href="/profile"
                    color="white"
                    bg="gray.900"
                    _hover={{ bg: "gray.700" }}
                    _active={{ bg: "gray.700" }}
                  >
                    ✨ Register
                  </Button>
                ) : null}
              </>
            )}
            {doesSessionExist && (
              <>
                <Menu placement="bottom-end">
                  <MenuButton
                    as={Button}
                    color="white"
                    bg="gray.900"
                    _hover={{ bg: "gray.700" }}
                    _active={{ bg: "gray.700" }}
                  >
                    👋 {name}
                  </MenuButton>
                  <MenuList>
                    <MenuItem as={NextLink} href="/profile">
                      📝 My Profile
                    </MenuItem>
                    <MenuItem as={NextLink} href="/account">
                      ⚙️ Account
                    </MenuItem>
                    <MenuItem onClick={onLogout}>🚶🏻‍♂️ Sign Out</MenuItem>
                  </MenuList>
                </Menu>
              </>
            )}
          </HStack>
          {(!isTalents || doesSessionExist) && (
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
          )}
        </Flex>
        {MobileNavContent}
      </Box>
    </Box>
  );
};
export default GlobalHeader;
