import EmailPasswordNode from "supertokens-node/recipe/emailpassword";
import SessionNode from "supertokens-node/recipe/session";
import Dashboard from "supertokens-node/recipe/dashboard";

import { appInfo } from "./appInfo";

export const backendConfig = () => {
  return {
    framework: "express",
    supertokens: {
      connectionURI: process.env.SUPERTOKENS_CONNECTION_URI,
      apiKey: process.env.SUPERTOKENS_API_KEY,
    },
    appInfo,
    recipeList: [
      EmailPasswordNode.init(),
      SessionNode.init(),
      Dashboard.init({
        apiKey: process.env.SUPERTOKENS_DASHBOARD_KEY,
      }),
    ],
    isInServerlessEnv: true,
  };
};
