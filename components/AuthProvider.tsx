"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { clearSession, getSession, User } from "@/lib/auth";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  logout: () => void;
  refreshSession: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = useCallback(() => {
    setUser(getSession());
  }, []);

  useEffect(() => {
    refreshSession();
    setIsLoading(false);
  }, [refreshSession]);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isLoading, logout, refreshSession }),
    [user, isLoading, logout, refreshSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
