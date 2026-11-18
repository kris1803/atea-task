import React, { useState } from "react";
import { authService } from "../../../lib/services";
import type { LoginPayload, User } from "../types";

type AuthContext = {
  user: User | null;
  login: (payload: LoginPayload) => Promise<User>;
  logout: () => Promise<void>;
};

const initialAuthContext: AuthContext = {
  user: null,
  logout: () => authService.logout(),
  login: (payload: LoginPayload) => authService.login(payload),
};

const AuthContext = React.createContext<AuthContext>(initialAuthContext);

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [user, setUser] = useState<User | null>(initialAuthContext.user);

  const login = async (payload: LoginPayload) => {
    const receivedUser = await authService.login(payload);
    setUser(receivedUser);
    return receivedUser;
  };
  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
