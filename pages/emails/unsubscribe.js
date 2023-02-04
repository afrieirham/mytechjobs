import axios from "axios";
import Cryptr from "cryptr";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Flex, Heading, Tag, Text } from "@chakra-ui/react";

function Unsubscribe() {
  const [email, setEmail] = useState();

  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      const cryptr = new Cryptr(process.env.UNSUBSCRIPTION_SECRET);
      const email = cryptr.decrypt(token);
      setEmail(email);
    }
  }, [token]);

  const onUnsubscribe = async () => {
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
    >
      <Heading size="md">Thank you being an awesome subscriber!</Heading>
      <Text>
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
      >
        Confirm and bye 👋
      </Button>
    </Flex>
  );
}

export default Unsubscribe;
