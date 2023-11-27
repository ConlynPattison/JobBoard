// Source: https://dayvster.com/blog/use-context-for-auth
// Change from source: [user, setUser] = useState rather than referring back to {...} =  useContext(AuthContext) ...
// old version never referred to a setUser function, user never changed in context
import { useContext } from "react";
import { useSessionStorage } from "./useSessionStorage.ts";
import { AuthContext } from "../context/AuthContext.tsx";

// NOTE: optimally move this into a separate file
export interface User {
  username: string;
  email: string;
  token?: string;
}

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
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
