import React, { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
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
  useCheckboxGroup,
} from "@chakra-ui/react";
import supertokensNode from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

import { places } from "../constants/paths";
import { getUserBySessionId } from "../controllers/users";
import { backendConfig } from "../config/backendConfig";
import SectionContainer from "../components/SectionContainer";

export const getServerSideProps = async (context) => {
  supertokensNode.init(backendConfig());
  let session;

  try {
    session = await Session.getSession(context.req, context.res);
  } catch (err) {
    if (err.type === Session.Error.TRY_REFRESH_TOKEN) {
      return { props: { fromSupertokens: "needs-refresh" } };
    }

    if (err.type === Session.Error.UNAUTHORISED) {
      return {
        redirect: {
          permanent: false,
          destination: "/auth?redirectToPath=profile",
        },
      };
    }
  }

  try {
    const userId = session.getUserId();
    const raw = await getUserBySessionId(userId);
    const data = JSON.parse(JSON.stringify(raw.user));

    const { __v, createdAt, updatedAt, ...rest } = data;

    return {
      props: {
        user: rest,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        permanent: false,
        destination: "/auth?redirectToPath=profile",
      },
    };
  }
};

function Profile({ user }) {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(user);
  const {
    headline,
    name,
    email,
    phone,
    city,
    state,
    bio,
    positions,
    status,
    jobTypes,
    jobLevels,
    arrangements,
    locations,
    availableDate,
    website,
    github,
    linkedin,
    jobAlerts,
  } = profile;

  const positionsCheckbox = useCheckboxGroup({ defaultValue: positions });
  const jobTypesCheckbox = useCheckboxGroup({ defaultValue: jobTypes });
  const jobLevelsCheckbox = useCheckboxGroup({ defaultValue: jobLevels });
  const arrangementsCheckbox = useCheckboxGroup({ defaultValue: arrangements });
  const locationsCheckbox = useCheckboxGroup({ defaultValue: locations });

  const onChangeText = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });
  const onChangeCheckbox = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.checked });
  const onChangeRadio = (name, value) =>
    setProfile({ ...profile, [name]: value });

  const states = places
    .filter((p) => p !== "remote")
    .map((p) => p.replaceAll("-", " "));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newProfile = {
      ...profile,
      positions: positionsCheckbox.value,
      jobTypes: jobTypesCheckbox.value,
      jobLevels: jobLevelsCheckbox.value,
      arrangements: arrangementsCheckbox.value,
      locations: locationsCheckbox.value,
    };
    const { data, error } = await axios.post("/api/users", newProfile);
    setLoading(false);
    alert(data.msg || error.msg);
  };

  return (
    <SessionAuth>
      <Box maxW="2xl" mt="8" mx="auto" as="form" onSubmit={onSubmit}>
        <Heading fontSize="2xl" px={{ base: "4", md: "0" }}>
          Developer Profile
        </Heading>
        <SectionContainer>
          <Heading size="md">Personal info</Heading>
          <Flex flexDirection="column" w="full">
            <Text fontWeight="semibold">Headline</Text>
            <Input
              name="headline"
              value={headline}
              onChange={onChangeText}
              placeholder="e.g. React Developer with 10+ years of experience"
            />
          </Flex>
          <Flex flexDirection="column" w="full">
            <Text fontWeight="semibold">Name</Text>
            <Input name="name" value={name} onChange={onChangeText} />
          </Flex>
          <Flex flexDirection="column" w="full">
            <Text fontWeight="semibold">Email</Text>
            <Input readOnly value={email} />
          </Flex>
          <Flex flexDirection="column" w="full">
            <Text fontWeight="semibold">Phone</Text>
            <InputGroup>
              <InputLeftAddon>+60</InputLeftAddon>
              <Input
                type="tel"
                name="phone"
                value={phone}
                onChange={onChangeText}
                placeholder="12 345 6789"
              />
            </InputGroup>
          </Flex>
          <Flex flexDirection="column" w="full">
            <Text fontWeight="semibold">City</Text>
            <Input
              name="city"
              value={city}
              onChange={onChangeText}
              placeholder="e.g. Shah Alam"
            />
          </Flex>
          <Flex flexDirection="column" w="full">
            <Text fontWeight="semibold">State</Text>
            <Select
              name="state"
              onChange={onChangeText}
              value={state}
              placeholder="State"
              textTransform="capitalize"
            >
              {states.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Select>
          </Flex>
        </SectionContainer>
        <SectionContainer>
          <Heading size="md">Your skills</Heading>
          <Flex flexDirection="column" w="full">
            <Text fontWeight="semibold">Bio</Text>
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
            <Textarea
              mt="2"
              minH="400px"
              name="bio"
              value={bio}
              onChange={onChangeText}
            />
          </Flex>
          <Flex flexDirection="column" w="full">
            <Text fontWeight="semibold">Preferred Positions</Text>
            <Stack mt="2" direction="column">
              <Checkbox
                {...positionsCheckbox.getCheckboxProps({
                  value: "frontend_developer",
                })}
              >
                <Text>Frontend Developer</Text>
              </Checkbox>
              <Checkbox
                {...positionsCheckbox.getCheckboxProps({
                  value: "backend_developer",
                })}
              >
                <Text>Backend Developer</Text>
              </Checkbox>
              <Checkbox
                {...positionsCheckbox.getCheckboxProps({
                  value: "fullstack_developer",
                })}
              >
                <Text>Fullstack Developer</Text>
              </Checkbox>
            </Stack>
          </Flex>
        </SectionContainer>
        <SectionContainer>
          <Heading size="md">Work preferences</Heading>
          <Flex flexDirection="column" w="full">
            <Text fontWeight="semibold">Search status</Text>
            <RadioGroup
              mt="2"
              name="status"
              value={status}
              onChange={(e) => onChangeRadio("status", e)}
            >
              <Stack direction="column">
                <Radio value="active">
                  <Text>Actively looking</Text>
                </Radio>
                <Radio value="open">
                  <Text>Open to opportunities</Text>
                </Radio>
                <Radio value="not_interested">
                  <Text>Not interested</Text>
                  <Text fontSize="xs">
                    Only people with links can see you profile.
                  </Text>
                </Radio>
                <Radio value="invisible">
                  <Text>Invisible</Text>
                  <Text fontSize="xs">
                    Your profile is hidden and can only be seen by yourself.
                  </Text>
                </Radio>
              </Stack>
            </RadioGroup>
          </Flex>
          <Flex flexDirection="column" w="full">
            <Text fontWeight="semibold">Role Type</Text>
            <Text fontSize="xs">
              Select all roles that you would consider taking.
            </Text>
            <Stack direction="column" mt="2">
              <Checkbox
                {...jobTypesCheckbox.getCheckboxProps({
                  value: "full-time_employment",
                })}
              >
                <Text>Full-time employment</Text>
              </Checkbox>
              <Checkbox
                {...jobTypesCheckbox.getCheckboxProps({
                  value: "contract",
                })}
              >
                <Text>Contract</Text>
              </Checkbox>
              <Checkbox
                {...jobTypesCheckbox.getCheckboxProps({
                  value: "freelance",
                })}
              >
                <Text>Freelance</Text>
              </Checkbox>
            </Stack>
          </Flex>
          <Flex flexDirection="column" w="full">
            <Text fontWeight="semibold">Role Level</Text>
            <Text fontSize="xs">
              Select all the experience levels you would consider taking.
            </Text>
            <Stack direction="column" mt="2">
              <Checkbox
                {...jobLevelsCheckbox.getCheckboxProps({
                  value: "junior",
                })}
              >
                <Text>Junior</Text>
              </Checkbox>
              <Checkbox
                {...jobLevelsCheckbox.getCheckboxProps({
                  value: "mid-level",
                })}
              >
                <Text>Mid-level</Text>
              </Checkbox>
              <Checkbox
                {...jobLevelsCheckbox.getCheckboxProps({
                  value: "senior",
                })}
              >
                <Text>Senior</Text>
              </Checkbox>
              <Checkbox
                {...jobLevelsCheckbox.getCheckboxProps({
                  value: "princial_staff",
                })}
              >
                <Text>Principal / Staff</Text>
              </Checkbox>
              <Checkbox
                {...jobLevelsCheckbox.getCheckboxProps({
                  value: "c-level",
                })}
              >
                <Text>C-level</Text>
              </Checkbox>
            </Stack>
          </Flex>
          <Flex flexDirection="column" w="full">
            <Text fontWeight="semibold">Working Arrangements</Text>
            <Text fontSize="xs">Select all if you are open for hybrid.</Text>
            <Stack direction="column" mt="2">
              <Checkbox
                {...arrangementsCheckbox.getCheckboxProps({
                  value: "remote",
                })}
              >
                <Text>Remote</Text>
              </Checkbox>
              <Checkbox
                {...arrangementsCheckbox.getCheckboxProps({
                  value: "on_site",
                })}
              >
                <Text>On-site</Text>
              </Checkbox>
            </Stack>
          </Flex>
          <Flex flexDirection="column" w="full">
            <Text fontWeight="semibold">Work Location</Text>
            <Text fontSize="xs">Select all locations you are available.</Text>
            <Stack direction="column" mt="2">
              {states.map((p) => (
                <Checkbox
                  key={p}
                  {...locationsCheckbox.getCheckboxProps({
                    value: p.replaceAll(" ", "_"),
                  })}
                >
                  <Text textTransform="capitalize">{p}</Text>
                </Checkbox>
              ))}
            </Stack>
          </Flex>
          <Flex flexDirection="column" w="full">
            <Text fontWeight="semibold">Available to start on</Text>
            <Input
              type="date"
              name="availableDate"
              value={
                availableDate
                  ? format(new Date(availableDate), "yyyy-MM-dd")
                  : ""
              }
              onChange={onChangeText}
            />
          </Flex>
        </SectionContainer>
        <SectionContainer>
          <Heading size="md">Online presence</Heading>
          <Flex flexDirection="column" w="full">
            <Text fontWeight="semibold">Website</Text>
            <InputGroup>
              <InputLeftAddon>https://</InputLeftAddon>
              <Input name="website" value={website} onChange={onChangeText} />
            </InputGroup>
            <Text fontSize="xs">Your personal website or portfolio</Text>
          </Flex>
          <Flex flexDirection="column" w="full">
            <Text fontWeight="semibold">GitHub</Text>
            <InputGroup>
              <InputLeftAddon>github.com/</InputLeftAddon>
              <Input name="github" value={github} onChange={onChangeText} />
            </InputGroup>
          </Flex>
          <Flex flexDirection="column" w="full">
            <Text fontWeight="semibold">LinkedIn</Text>
            <InputGroup>
              <InputLeftAddon>linkedin.com/in/</InputLeftAddon>
              <Input name="linkedin" value={linkedin} onChange={onChangeText} />
            </InputGroup>
          </Flex>
        </SectionContainer>
        {/* <SectionContainer>
          <Heading size="md">Email notifications</Heading>
          <Stack direction="column">
            <Checkbox
              name="jobAlerts"
              value={jobAlerts}
              checked={jobAlerts}
              defaultChecked={jobAlerts}
              onChange={onChangeCheckbox}
            >
              Get weekly job alerts via email
            </Checkbox>
          </Stack>
        </SectionContainer> */}
        <Flex mt="4" justifyContent="flex-end" px={{ base: "4", md: "0" }}>
          <Button
            type="submit"
            isLoading={loading}
            colorScheme="messenger"
            size={{ base: "lg", md: "md" }}
            w={{ base: "full", md: "auto" }}
          >
            Save
          </Button>
        </Flex>
      </Box>
    </SessionAuth>
  );
}

export default Profile;
