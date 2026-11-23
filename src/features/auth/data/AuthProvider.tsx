import { useState } from "react";
import type { LoginPayload, User } from "../types";
import { AuthContext, initialAuthContext } from "./AuthContext";
import { authService } from "../../../lib/services";

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
