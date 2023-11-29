// Source: https://dayvster.com/blog/use-context-for-auth
import { useEffect } from "react";
import { useUser, User } from "./useUser.ts";
import { useSessionStorage } from "./useSessionStorage.ts";

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();
  const { getItem } = useSessionStorage();

  useEffect(() => {
    const user = getItem("user");
    if (user) {
      addUser(JSON.parse(user));
    }
  }, []);

  const login = (user: User) => {
    addUser(user);
  };

  const logout = () => {
    removeUser();
  };

  return { user, login, logout };
};
