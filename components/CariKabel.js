import { Box, Link, Stack, Text } from "@chakra-ui/react";

export default function Slides() {
  return (
    <Box w="full" bg="black" p="1">
      <Stack
        mx="auto"
        maxW="4xl"
        spacing="3"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text color="white" fontWeight="bold" textAlign="center" fontSize="sm">
          Find more remote jobs at{" "}
          <Link isExternal href="https://kerja-remote.com">
            Kerja-Remote.com
          </Link>
        </Text>
      </Stack>
    </Box>
  );
}
