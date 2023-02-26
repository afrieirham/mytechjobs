import useSWR from "swr";
import { createContext } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

import { fetcher } from "../helpers/fetcher";

export const UserContext = createContext({});

export function UserProvider({ children }) {
  const { userId } = useSessionContext();
  const { data } = useSWR(userId ? "/api/me?id=" + userId : "", fetcher);

  return (
    <UserContext.Provider value={{ name: data?.name, status: data?.status }}>
      {children}
    </UserContext.Provider>
  );
}
