import { Analytics } from "@vercel/analytics/react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";

import GlobalFooter from "../components/GlobalFooter";
import { frontendConfig } from "../config/frontendConfig";

if (typeof window !== "undefined") {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig());
}

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
      <SuperTokensWrapper>
        <Component {...pageProps} />
        <Analytics />
        <GlobalFooter />
      </SuperTokensWrapper>
    </ChakraProvider>
  );
}

export default MyApp;
