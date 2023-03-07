import React from "react";
import {
  Checkbox,
  Flex,
  Heading,
  HStack,
  Select,
  Text,
} from "@chakra-ui/react";

import { frameworks, places } from "../constants/paths";
import FlagIcon from "./FlagIcon";
import TechIcon from "./TechIcon";
import { useRouter } from "next/router";

function Filters({
  sortBy,
  setSortBy,
  techValue,
  locationValue,
  setPage,
  onChangeTech,
  onChangeLocation,
  techGetCheckboxProps,
  locationGetCheckboxProps,
  jobTypeValue,
  onChangeJobType,
  jobTypeGetCheckboxProps,
}) {
  const router = useRouter();
  const onChangeJobTypeCustom = (e) => {
    const jobType = e.target.value;
    const isSelected = jobTypeValue.some((t) => t === jobType);

    let newJobTypeValue = [];
    if (isSelected) {
      newJobTypeValue = jobTypeValue.filter((t) => t !== jobType);
    } else {
      newJobTypeValue = [...jobTypeValue, jobType];
    }
    setPage(1);
    onChangeJobType(e);
    router.push(
      {
        query: {
          tech: techValue,
          location: locationValue,
          sortBy: sortBy,
          jobType: newJobTypeValue,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const onChangeTechCustom = (e) => {
    const tech = e.target.value;
    const isSelected = techValue.some((t) => t === tech);

    let newTechValue = [];
    if (isSelected) {
      newTechValue = techValue.filter((t) => t !== tech);
    } else {
      newTechValue = [...techValue, tech];
    }
    setPage(1);
    onChangeTech(e);
    router.push(
      { query: { tech: newTechValue, location: locationValue, sortBy } },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const onChangeLocationCustom = (e) => {
    const location = e.target.value;
    const isSelected = locationValue.some((t) => t === location);

    let newLocationValue = [];
    if (isSelected) {
      newLocationValue = locationValue.filter((t) => t !== location);
    } else {
      newLocationValue = [...locationValue, location];
    }

    setPage(1);
    onChangeLocation(e);
    router.push(
      {
        query: { location: newLocationValue, tech: techValue, sortBy },
      },
      undefined,
      { shallow: true }
    );
  };

  const onChangeSort = (e) => {
    setSortBy(e.target.value);
    router.push(
      {
        query: {
          tech: techValue,
          location: locationValue,
          sortBy: e.target.value,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <>
      <Heading size="xs" mt="4">
        Sort Jobs 🌊
      </Heading>
      <Select value={sortBy} onChange={onChangeSort} mt="4">
        <option value="posted">Posted on</option>
        <option value="added">Added on</option>
      </Select>

      <Heading size="xs" mt="8">
        By Job Type 👷🏻‍♂️
      </Heading>

      <Flex flexDirection="column">
        {["full time", "part time", "contract", "internship"].map((f, i) => (
          <Checkbox
            key={i}
            mt="4"
            {...jobTypeGetCheckboxProps({ value: f })}
            onChange={onChangeJobTypeCustom}
          >
            <HStack>
              <Text as="span" size="sm" textTransform="capitalize">
                {f.replaceAll("-", " ")}
              </Text>
            </HStack>
          </Checkbox>
        ))}
      </Flex>

      <Heading size="xs" mt="8">
        By Tech ⚡️
      </Heading>

      <Flex flexDirection="column">
        {frameworks.map((f, i) => (
          <Checkbox
            key={i}
            mt="4"
            {...techGetCheckboxProps({ value: f })}
            onChange={onChangeTechCustom}
          >
            <HStack>
              <TechIcon name={f} size="18px" />
              <Text as="span" size="sm" textTransform="capitalize">
                {f.replaceAll("-", " ")}
              </Text>
            </HStack>
          </Checkbox>
        ))}
      </Flex>

      <Heading size="xs" mt="16">
        By Location 📍
      </Heading>

      <Flex flexDirection="column">
        {places.map((f, i) => (
          <Checkbox
            key={i}
            mt="4"
            {...locationGetCheckboxProps({ value: f })}
            onChange={onChangeLocationCustom}
          >
            <HStack>
              <FlagIcon name={f} size="24px" />
              <Text as="span" size="sm" textTransform="capitalize">
                {f.replaceAll("-", " ")}
              </Text>
            </HStack>
          </Checkbox>
        ))}
      </Flex>
    </>
  );
}

export default Filters;
