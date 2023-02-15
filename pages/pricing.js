import { Button, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

function pricing() {
  return (
    <div>
      <Head>
        <title>Pricing | Kerja IT</title>
      </Head>
      <Flex flexDirection="column" maxW="2xl" mx="auto" p="4">
        <Flex flexDirection="column" w="full" alignItems="center" mt="4">
          <Heading size="lg">Hire developers with kerja-it.com</Heading>

          <Flex
            p="8"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            borderWidth="1px"
            borderColor="gray.300"
            borderRadius="lg"
            bg="white"
            w="full"
            mt="8"
          >
            <VStack spacing="0" textAlign="center">
              <Text fontSize="2xl" fontWeight="bold">
                Talent Search
              </Text>
              <Text fontSize="sm">Get connected with developers today</Text>
            </VStack>
            <VStack mt="4">
              <HStack justifyContent="center">
                <Heading>RM99</Heading>
                <Text color="gray.500">/month</Text>
              </HStack>
              <Text fontSize="xs" color="gray.600">
                + 10% first year salary
              </Text>
              <Button
                as="a"
                target="_blank"
                href={process.env.NEXT_PUBLIC_SUBSCRIPTION_LINK}
              >
                Find developers today
              </Button>
            </VStack>
          </Flex>

          <Flex
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            borderWidth="1px"
            borderColor="gray.300"
            borderRadius="lg"
            bg="white"
            w="full"
            mt="4"
            p="8"
          >
            <VStack spacing="0" textAlign="center">
              <Text fontSize="2xl" fontWeight="bold">
                Job Advertising
              </Text>
              <Text fontSize="sm">Active forever</Text>
              <Text fontSize="sm">
                Broadcast to 50+ candidates via email directly
              </Text>
            </VStack>
            <VStack mt="4">
              <HStack justifyContent="center">
                <Heading>RM59</Heading>
                <Text color="gray.500">/post</Text>
              </HStack>
              <Button as="a" href="/hire">
                Advertise job now
              </Button>
            </VStack>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}

export default pricing;
