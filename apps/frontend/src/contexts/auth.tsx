'use client';

import React, { createContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { VERIFY_TOKEN } from '../graphql/auth';

export const AuthContext = createContext<{
  user: any;
  login: (token: string, user: any) => void;
  logout: () => void;
  isVerified: boolean;
}>({
  user: null,
  login: () => {},
  logout: () => {},
  isVerified: false
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const { data } = useQuery(VERIFY_TOKEN, {
    skip: !token,
    onError: () => {
      logout();
    }
  });

  useEffect(() => {
    if (data?.verifyToken) {
      setUser(data.verifyToken);
      setIsVerified(data.verifyToken.isVerified || false);
    }
  }, [data]);

  const login = (newToken: string, newUser: any) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(newUser);
    setIsVerified(newUser?.isVerified || false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsVerified(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isVerified }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
