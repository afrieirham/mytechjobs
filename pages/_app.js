import { Analytics } from "@vercel/analytics/react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider
      theme={extendTheme({
        styles: {
          global: {
            body: {
              background: "gray.50",
            },
          },
        },
        fonts: {
          heading: `'Inconsolata', monospace`,
          body: `'Inconsolata', monospace`,
        },
      })}
    >
      <Component {...pageProps} />
      <Analytics />
    </ChakraProvider>
  );
}

export default MyApp;
