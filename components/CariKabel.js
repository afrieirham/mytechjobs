import { Box, Button, Stack, Text, useDisclosure } from "@chakra-ui/react";

export default function Slides() {
  const { isOpen, onToggle } = useDisclosure();

  if (isOpen) return null;

  return (
    <Box w="full" bg="black" p="4">
      <Stack
        mx="auto"
        maxW="4xl"
        spacing="3"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text color="white" fontWeight="bold" textAlign="center">
          👻 Tired of being ghosted by employers? Apply for jobs through
          referrals instead with CariKabel.com
        </Text>
        <Stack
          w="full"
          justifyContent="center"
          direction={{ base: "column", md: "row" }}
        >
          <Button
            as="a"
            href="https://carikabel.com"
            w={{ base: "full", md: "auto" }}
          >
            Go to CariKabel.com 🤝
          </Button>
          <Button
            onClick={onToggle}
            variant="outline"
            colorScheme="whiteAlpha"
            w={{ base: "full", md: "auto" }}
          >
            No, thank you.
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
