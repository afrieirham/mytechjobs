import React, { useState } from "react";
import axios from "axios";

import { useRouter } from "next/router";
import { Button, Flex, Heading, Tag, Text } from "@chakra-ui/react";

function Unsubscribe() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { token, email } = router.query;

  const onUnsubscribe = async () => {
    setLoading(true);
    await axios.post("/api/unsubscribe", { token });
    alert("Success");
    router.push("/");
  };

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      w="100vw"
      h="90vh"
      maxW="2xl"
      mx="auto"
      px="4"
    >
      <Heading size="md" textAlign="center">
        Thank you being an awesome subscriber!
      </Heading>
      <Text textAlign="center">
        We hope you&apos;ve landed a job and don&apos;t need this anymore. 🥳
      </Text>
      <Text mt="8" fontSize="sm">
        Unsubscribe for:{" "}
        <Tag colorScheme="messenger" size="sm">
          {email}
        </Tag>
      </Text>
      <Button
        mt="2"
        size="sm"
        colorScheme="messenger"
        onClick={onUnsubscribe}
        isDisabled={!email}
        isLoading={loading}
      >
        Confirm and bye 👋
      </Button>
    </Flex>
  );
}

export default Unsubscribe;
