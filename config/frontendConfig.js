import Router from "next/router";
import EmailPasswordReact from "supertokens-auth-react/recipe/emailpassword";
import SessionReact from "supertokens-auth-react/recipe/session";

import { appInfo } from "./appInfo";

export const frontendConfig = () => {
  return {
    appInfo: {
      ...appInfo,
      apiDomain: window.location.origin,
      websiteDomain: window.location.origin,
    },
    recipeList: [
      SessionReact.init(),
      EmailPasswordReact.init({
        signInAndUpFeature: {
          defaultToSignUp: true,
          signUpForm: {
            formFields: [
              {
                id: "name",
                label: "Full name",
                placeholder: "e.g. Ahmad Farah",
              },
            ],
          },
        },
      }),
    ],
    windowHandler: (oI) => {
      return {
        ...oI,
        location: {
          ...oI.location,
          setHref: (href) => {
            Router.push(href);
          },
        },
      };
    },
  };
};
