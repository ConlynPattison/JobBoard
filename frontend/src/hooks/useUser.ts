// Source: https://dayvster.com/blog/use-context-for-auth
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.tsx";
import { useSessionStorage } from "./useSessionStorage.ts";

// NOTE: optimally move this into a separate file
export interface User {
  username: string;
  email: string;
  token?: string;
}

export const useUser = () => {
  const [user, setUser] = useState(null);
  const { setItem } = useSessionStorage();

  const addUser = (user: User) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    setItem("user", "");
  };

  return { user, addUser, removeUser };
};
