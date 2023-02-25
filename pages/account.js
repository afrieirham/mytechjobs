import React, { useState } from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

import SectionContainer from "../components/SectionContainer";
import axios from "axios";

const initialState = {
  oldPassword: "",
  newPassword: "",
  repeatPassword: "",
};

function Account() {
  const [password, setPassword] = useState(initialState);

  const { oldPassword, newPassword, repeatPassword } = password;

  const onChange = (e) =>
    setPassword({ ...password, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== repeatPassword) {
      alert("Password don't match");
    }

    axios
      .post("/api/supertokens/change-password", password)
      .then(({ data }) => {
        alert(data?.msg);
        setPassword(initialState);
      })
      .catch(({ response }) => alert(response?.data?.msg));
  };

  return (
    <SessionAuth>
      <Box maxW="2xl" mt="8" mx="auto">
        <Heading fontSize="2xl" px={{ base: "4", md: "0" }} mt="8">
          Account Settings
        </Heading>
        <SectionContainer as="form" onSubmit={onSubmit}>
          <Heading size="md">Change password</Heading>
          <Stack direction="column">
            <Flex flexDirection="column" w="full">
              <Text fontWeight="semibold">Current Password</Text>
              <Input
                type="password"
                name="oldPassword"
                value={oldPassword}
                onChange={onChange}
              />
            </Flex>
            <Flex flexDirection="column" w="full">
              <Text fontWeight="semibold">New Password</Text>
              <Input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={onChange}
              />
            </Flex>
            <Flex flexDirection="column" w="full">
              <Text fontWeight="semibold">Repeat Password</Text>
              <Input
                type="password"
                name="repeatPassword"
                value={repeatPassword}
                onChange={onChange}
              />
            </Flex>
          </Stack>
          <Flex mt="4" justifyContent="flex-end">
            <Button type="submit" w={{ base: "full", md: "auto" }}>
              Save
            </Button>
          </Flex>
        </SectionContainer>
        <Flex mt="4" px="4">
          <Button
            mx="auto"
            as="a"
            href="/alerts"
            variant="ghost"
            target="_blank"
            w={{ base: "full", md: "auto" }}
          >
            💌 Get Job Alerts
          </Button>
        </Flex>
      </Box>
    </SessionAuth>
  );
}

export default Account;
