import { createContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { LoginResponse, UserResponse } from "../models/user";
import { saveAuth, getAuth, clearAuth } from "../core/authStorage";
import { validateToken } from "../services/user_service";

export type AuthContextType = {
  token: string | null;
  user: UserResponse | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  login: (data: LoginResponse, remember?: boolean) => void;
  logout: () => void;
  updateUser: (user: UserResponse) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = getAuth();
  const [token, setToken] = useState<string | null>(auth?.token || null);
  const [user, setUser] = useState<UserResponse | null>(auth?.user || null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    async function verfifySession() {
      try {
        const currentAuth = getAuth()
        if (currentAuth?.token) {
          const isValid = await validateToken(currentAuth.token);
          if (isValid) {
            setToken(currentAuth.token);
            setUser(currentAuth.user);
          } else {
            setToken(null);
            setUser(null);
            clearAuth();
          }
        } else {
          setToken(null);
          setUser(null);
        }
      } finally {
        setIsHydrated(true)
      }
    }
    verfifySession()

  }, []);

  const login = (data: LoginResponse, remember: boolean = true) => {
    setToken(data.token);
    setUser(data.userResponse);
    saveAuth(data.token, data.userResponse, remember);
  };

  const updateUser = (updatedUser: UserResponse) => {
    setUser(updatedUser);
    const actualToken = token || getAuth()?.token || null;
    if (actualToken) {
      saveAuth(actualToken, updatedUser, true);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    clearAuth();
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: !!token,
      isHydrated,
      login,
      logout,
      updateUser,
    }),
    [token, user, isHydrated]  
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}