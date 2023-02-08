import React from "react";
import ReactMarkdown from "react-markdown";
import {
  Divider,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

function ChakraMarkdown({ children }) {
  return (
    <ReactMarkdown
      components={{
        p({ children }) {
          return <Text>{children}</Text>;
        },
        em({ children }) {
          return <Text as="em">{children}</Text>;
        },
        i({ children }) {
          return <Text as="i">{children}</Text>;
        },
        hr() {
          return <Divider />;
        },
        text({ children }) {
          return <Text as="span">{children}</Text>;
        },
        ul({ children }) {
          return <UnorderedList>{children}</UnorderedList>;
        },
        ol({ children }) {
          return <OrderedList>{children}</OrderedList>;
        },
        li({ children }) {
          return <ListItem>{children}</ListItem>;
        },
        h1({ children }) {
          return (
            <Text as="h1" fontWeight="bold" fontSize="lg">
              {children}
            </Text>
          );
        },
        h2({ children }) {
          return (
            <Text as="h2" fontWeight="bold" fontSize="md">
              {children}
            </Text>
          );
        },
        h3({ children }) {
          return (
            <Text as="h3" fontWeight="bold" fontSize="sm">
              {children}
            </Text>
          );
        },
        h4({ children }) {
          return (
            <Text as="h4" fontWeight="bold" fontSize="xs">
              {children}
            </Text>
          );
        },
        h5({ children }) {
          return (
            <Text as="h5" fontWeight="bold" fontSize="xx-small">
              {children}
            </Text>
          );
        },
        h6({ children }) {
          return (
            <Text as="h6" fontWeight="bold" fontSize="xx-small">
              {children}
            </Text>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

export default ChakraMarkdown;
