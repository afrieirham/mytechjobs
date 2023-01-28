import React from "react";
import { Checkbox, Flex, Heading, HStack, Text } from "@chakra-ui/react";

import { frameworks, places } from "../constants/paths";
import FlagIcon from "./FlagIcon";
import TechIcon from "./TechIcon";
import { useRouter } from "next/router";

function Filters({
  techValue,
  locationValue,
  setPage,
  onChangeTech,
  onChangeLocation,
  techGetCheckboxProps,
  locationGetCheckboxProps,
}) {
  const router = useRouter();
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
      { query: { tech: newTechValue, location: locationValue } },
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
        query: { location: newLocationValue, tech: techValue },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <>
      <Heading size="xs">By Tech ⚡️</Heading>

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
