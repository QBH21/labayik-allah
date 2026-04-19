import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  loadAuthData,
  registerAccount,
  loginAccount,
  isUsernameTaken,
  setActiveUser,
  AuthData,
} from '../utils/storage';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  hasAccount: boolean;
  username: string;
  login: (pin: string) => Promise<boolean>;
  register: (username: string, pin: string) => Promise<{ success: boolean; error?: string }>;
  checkUsername: (username: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  hasAccount: false,
  username: '',
  login: async () => false,
  register: async () => ({ success: false }),
  checkUsername: async () => false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authData, setAuthData] = useState<AuthData | null>(null);

  useEffect(() => {
    loadAuthData().then((data) => {
      setAuthData(data);
      setIsLoading(false);
    });
  }, []);

  const login = useCallback(
    async (pin: string): Promise<boolean> => {
      if (!authData) return false;
      const success = await loginAccount(authData.username, pin);
      if (success) {
        setIsAuthenticated(true);
        return true;
      }
      return false;
    },
    [authData]
  );

  const register = useCallback(
    async (username: string, pin: string): Promise<{ success: boolean; error?: string }> => {
      const taken = await isUsernameTaken(username);
      if (taken) {
        return { success: false, error: 'This username is already taken. Please choose another.' };
      }
      const data: AuthData = { username, pin };
      const ok = await registerAccount(data);
      if (ok) {
        setAuthData(data);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, error: 'Registration failed. Please try again.' };
    },
    []
  );

  const checkUsername = useCallback(async (username: string): Promise<boolean> => {
    return isUsernameTaken(username);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        hasAccount: authData !== null,
        username: authData?.username ?? '',
        login,
        register,
        checkUsername,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
