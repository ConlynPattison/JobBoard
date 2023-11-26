// Source: https://dayvster.com/blog/use-context-for-auth
import { createContext } from "react";
import { User } from "../hooks/useUser";

interface AuthContextI {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextI>({
  user: null,
  setUser: () => {},
});
