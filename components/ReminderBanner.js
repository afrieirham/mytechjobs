import React, { useContext } from "react";
import NextLink from "next/link";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { Box, Button, Stack, Text } from "@chakra-ui/react";

import { UserContext } from "../context/user";

function ReminderBanner() {
  const { doesSessionExist } = useSessionContext();
  const { status } = useContext(UserContext);

  const isVisible = ["active", "open"].some((s) => s === status);
  const show = doesSessionExist && !isVisible;

  if (!show) {
    return null;
  }

  return (
    <Box w="full" bg="messenger.500" p="4">
      <Stack
        mx="auto"
        maxW="4xl"
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Text color="white" fontWeight="bold" textAlign="center">
          🚨 Your profile is invisible – employers can&apos;t find you.
        </Text>
        <Button as={NextLink} href="/profile" w={{ base: "full", md: "auto" }}>
          Edit my profile
        </Button>
      </Stack>
    </Box>
  );
}

export default ReminderBanner;
