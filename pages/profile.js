import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  ListItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
  UnorderedList,
} from "@chakra-ui/react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

import { places } from "../constants/paths";

function Profile() {
  const locations = places
    .filter((p) => p !== "remote")
    .map((p) => p.replaceAll("-", " "));

  return (
    <SessionAuth>
      <Box maxW="2xl" mt="8" mx="auto">
        <Heading fontSize="2xl" px={{ base: "4", md: "0" }}>
          Your developer profile
        </Heading>
        <SectionContainer>
          <Heading size="md">Personal Info</Heading>
          <Flex flexDirection="column" w="full">
            <Text fontSize="md" fontWeight="bold">
              Headline
            </Text>
            <Input placeholder="e.g. React Developer with 10+ years of experience" />
          </Flex>
          <Flex flexDirection="column" w="full">
            <Text fontSize="md" fontWeight="bold">
              Name
            </Text>
            <Input />
          </Flex>
          <Flex flexDirection="column" w="full">
            <Text fontSize="md" fontWeight="bold">
              Email
            </Text>
            <Input readOnly />
          </Flex>
          <Flex flexDirection="column" w="full">
            <Text fontSize="md" fontWeight="bold">
              Phone
            </Text>
            <InputGroup>
              <InputLeftAddon>+60</InputLeftAddon>
              <Input type="tel" placeholder="12 345 6789" />
            </InputGroup>
          </Flex>
          <Flex flexDirection="column" w="full">
            <Text fontSize="md" fontWeight="bold">
              City
            </Text>
            <Input placeholder="e.g. Shah Alam" />
          </Flex>
          <Flex flexDirection="column" w="full">
            <Text fontSize="md" fontWeight="bold">
              State
            </Text>
            <Select placeholder="State" textTransform="capitalize">
              {locations.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </Select>
          </Flex>
        </SectionContainer>
        <SectionContainer>
          <Heading size="md">Your Skills</Heading>
          <Flex flexDirection="column" w="full">
            <Text fontSize="md" fontWeight="bold">
              Bio
            </Text>
            <Text>
              Share a few paragraphs on what makes you unique as a developer.
              This is your chance to market yourself to potential employers –
              sell yourself a little!
            </Text>
            <Text mt="2">EXAMPLE TOPICS</Text>
            <UnorderedList px="2">
              <ListItem>Projects you involved in</ListItem>
              <ListItem>Your proudest achievements</ListItem>
              <ListItem>Any freelancing experience</ListItem>
              <ListItem>Side-projects you build</ListItem>
              <ListItem>Any recent milestones or accomplishments</ListItem>
              <ListItem>How you can help where others can&apos;t</ListItem>
            </UnorderedList>
            <Textarea minH="400px" mt="2" />
          </Flex>
          <Flex flexDirection="column" w="full">
            <Text fontSize="md" fontWeight="bold">
              Preferred Role
            </Text>
            <Stack direction="column" mt="2">
              <Checkbox>
                <Text fontSize="md">Frontend Developer</Text>
              </Checkbox>
              <Checkbox>
                <Text fontSize="md">Backend Developer</Text>
              </Checkbox>
              <Checkbox>
                <Text fontSize="md">Fullstack Developer</Text>
              </Checkbox>
            </Stack>
          </Flex>
        </SectionContainer>
        <SectionContainer>
          <Heading size="md">Work Preferences</Heading>
          <Flex flexDirection="column" w="full">
            <Text fontSize="md" fontWeight="bold">
              Search status
            </Text>
            <RadioGroup mt="2">
              <Stack direction="column">
                <Radio value="1">
                  <Text>Actively looking</Text>
                </Radio>
                <Radio value="2">
                  <Text>Open to opportunities</Text>
                </Radio>
                <Radio value="3">
                  <Text>Not interested</Text>
                  <Text fontSize="xs">
                    Your profile will not be listed but people can still access
                    with links.
                  </Text>
                </Radio>
                <Radio value="4">
                  <Text>Invisible</Text>
                  <Text fontSize="xs">
                    Your profile is hidden and can only be seen by yourself.
                  </Text>
                </Radio>
              </Stack>
            </RadioGroup>
          </Flex>
          <Flex flexDirection="column" w="full">
            <Text fontSize="md" fontWeight="bold">
              Role Type
            </Text>
            <Text fontSize="xs">
              Select all roles that you would consider taking.
            </Text>
            <Stack direction="column" mt="2">
              <Checkbox>
                <Text fontSize="md">Full-time employment</Text>
              </Checkbox>
              <Checkbox>
                <Text fontSize="md">Contract</Text>
              </Checkbox>
              <Checkbox>
                <Text fontSize="md">Freelance</Text>
              </Checkbox>
            </Stack>
          </Flex>
          <Flex flexDirection="column" w="full">
            <Text fontSize="md" fontWeight="bold">
              Role Level
            </Text>
            <Text fontSize="xs">
              Select all the experience levels you would consider taking.
            </Text>
            <Stack direction="column" mt="2">
              <Checkbox>
                <Text fontSize="md">Junior</Text>
              </Checkbox>
              <Checkbox>
                <Text fontSize="md">Mid-level</Text>
              </Checkbox>
              <Checkbox>
                <Text fontSize="md">Senior</Text>
              </Checkbox>
              <Checkbox>
                <Text fontSize="md">Principal / Staff</Text>
              </Checkbox>
              <Checkbox>
                <Text fontSize="md">C-level</Text>
              </Checkbox>
            </Stack>
          </Flex>
          <Flex flexDirection="column" w="full">
            <Text fontSize="md" fontWeight="bold">
              Working Arrangements
            </Text>
            <Text fontSize="xs">Select all if you are open for hybrid.</Text>
            <Stack direction="column" mt="2">
              <Checkbox>
                <Text fontSize="md">Remote</Text>
              </Checkbox>
              <Checkbox>
                <Text fontSize="md">On-site</Text>
              </Checkbox>
            </Stack>
          </Flex>
          <Flex flexDirection="column" w="full">
            <Text fontSize="md" fontWeight="bold">
              Work Location
            </Text>
            <Text fontSize="xs">Select all locations you are available.</Text>
            <Stack direction="column" mt="2">
              {locations.map((p) => (
                <Checkbox key={p}>
                  <Text fontSize="md" textTransform="capitalize">
                    {p}
                  </Text>
                </Checkbox>
              ))}
            </Stack>
          </Flex>
          <Flex flexDirection="column" w="full">
            <Text fontSize="md" fontWeight="bold">
              Available to start on
            </Text>
            <Input type="date" />
          </Flex>
        </SectionContainer>
        <SectionContainer>
          <Heading size="md">Online Presence</Heading>
          <Flex flexDirection="column" w="full">
            <Text fontSize="md" fontWeight="bold">
              Website
            </Text>
            <InputGroup>
              <InputLeftAddon>https://</InputLeftAddon>
              <Input />
            </InputGroup>
            <Text fontSize="xs">Your personal website or portfolio</Text>
          </Flex>
          <Flex flexDirection="column" w="full">
            <Text fontSize="md" fontWeight="bold">
              GitHub
            </Text>
            <InputGroup>
              <InputLeftAddon>github.com/</InputLeftAddon>
              <Input />
            </InputGroup>
          </Flex>
          <Flex flexDirection="column" w="full">
            <Text fontSize="md" fontWeight="bold">
              LinkedIn
            </Text>
            <InputGroup>
              <InputLeftAddon>linkedin.com/in/</InputLeftAddon>
              <Input />
            </InputGroup>
          </Flex>
        </SectionContainer>
        <SectionContainer>
          <Heading size="md">Email notifications</Heading>
          <Stack direction="column">
            <Checkbox>Get weekly job alerts via email</Checkbox>
          </Stack>
        </SectionContainer>
        <Flex mt="4" justifyContent="flex-end" px={{ base: "4", md: "0" }}>
          <Button
            size={{ base: "lg", md: "md" }}
            colorScheme="messenger"
            w={{ base: "full", md: "auto" }}
          >
            Save
          </Button>
        </Flex>
      </Box>
    </SessionAuth>
  );
}

function SectionContainer({ children }) {
  return (
    <Flex
      mt="4"
      flexDirection="column"
      maxW="2xl"
      mx="auto"
      p={{ base: "4", md: "8" }}
      bg="white"
      borderWidth={{ base: "none", md: "1px" }}
      borderColor="gray.300"
      borderRadius={{ base: "none", md: "lg" }}
    >
      <Stack direction="column" spacing="6">
        {children}
      </Stack>
    </Flex>
  );
}

export default Profile;
