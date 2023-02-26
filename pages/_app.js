import { Analytics } from "@vercel/analytics/react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";

import { UserProvider } from "../context/user";
import { frontendConfig } from "../config/frontendConfig";
import GlobalFooter from "../components/GlobalFooter";
import GlobalHeader from "../components/GlobalHeader";
import ReminderBanner from "../components/ReminderBanner";

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
        <UserProvider>
          <GlobalHeader />
          <ReminderBanner />
          <Component {...pageProps} />
          <Analytics />
          <GlobalFooter />
        </UserProvider>
      </SuperTokensWrapper>
    </ChakraProvider>
  );
}

export default MyApp;
