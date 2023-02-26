import EmailPasswordNode from "supertokens-node/recipe/emailpassword";
import SessionNode from "supertokens-node/recipe/session";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserMetadata from "supertokens-node/recipe/usermetadata";

import { appInfo } from "./appInfo";
import { createUser } from "../controllers/users";
import { addContactToList } from "../helpers/addContactToList";
import { notifyTelegram } from "../helpers/notifyTelegram";

export const backendConfig = () => {
  return {
    framework: "express",
    supertokens: {
      connectionURI: process.env.SUPERTOKENS_CONNECTION_URI,
      apiKey: process.env.SUPERTOKENS_API_KEY,
    },
    appInfo: {
      ...appInfo,
      apiDomain: process.env.VERCEL_URL,
      websiteDomain: process.env.VERCEL_URL,
    },
    recipeList: [
      EmailPasswordNode.init({
        signUpFeature: { formFields: [{ id: "name" }] },
        override: {
          apis: (originalImplementation) => {
            return {
              ...originalImplementation,
              // add name to user metadata
              signUpPOST: async (input) => {
                if (originalImplementation.signUpPOST === undefined) {
                  throw Error("Should never come here");
                }
                const response = await originalImplementation.signUpPOST(input);
                if (response.status === "OK") {
                  const formFields = input?.formFields;
                  const name = formFields?.find((f) => f.id === "name");
                  const email = formFields?.find((f) => f.id === "email");
                  const userId = response.user.id;

                  await UserMetadata.updateUserMetadata(userId, {
                    first_name: name.value,
                  });

                  await createUser({
                    name: name.value,
                    email: email.value,
                    superTokensId: userId,
                  });

                  await addContactToList({
                    name: name.value,
                    email: email.value,
                  });

                  await notifyTelegram(`new user signed up – ${email.value}`);
                }

                return response;
              },
            };
          },
        },
      }),
      SessionNode.init({
        override: {
          // pass metadata to accessTokenPayload
          functions: (originalImplementation) => {
            return {
              ...originalImplementation,
              createNewSession: async (input) => {
                const { userId } = input;
                const { metadata } = await UserMetadata.getUserMetadata(userId);

                input.accessTokenPayload = {
                  ...input.accessTokenPayload,
                  ...metadata,
                };

                return originalImplementation.createNewSession(input);
              },
            };
          },
        },
      }),
      UserMetadata.init(),
      Dashboard.init({ apiKey: process.env.SUPERTOKENS_DASHBOARD_KEY }),
    ],
    isInServerlessEnv: true,
  };
};
