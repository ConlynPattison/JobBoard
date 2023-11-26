// Source: https://dayvster.com/blog/use-context-for-auth
// Change from source: [user, setUser] = useState rather than referring back to {...} =  useContext(AuthContext) ...
// old version never referred to a setUser function, user never changed in context
import { useState } from "react";
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
