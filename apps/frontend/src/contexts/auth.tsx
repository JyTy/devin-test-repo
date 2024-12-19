'use client';

import React, { createContext, useState } from 'react';

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

  const login = (token: string, user: any) => {
    localStorage.setItem('token', token);
    setUser(user);
    setIsVerified(user?.isVerified || false);
  };

  const logout = () => {
    localStorage.removeItem('token');
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
