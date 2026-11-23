import React from "react";
import { authService } from "../../../lib/services";
import type { LoginPayload, User } from "../types";

type AuthContext = {
  user: User | null;
  login: (payload: LoginPayload) => Promise<User>;
  logout: () => Promise<void>;
};

export const initialAuthContext: AuthContext = {
  user: null,
  logout: () => authService.logout(),
  login: (payload: LoginPayload) => authService.login(payload),
};

export const AuthContext = React.createContext<AuthContext>(initialAuthContext);

export const useAuth = () => React.useContext(AuthContext);
