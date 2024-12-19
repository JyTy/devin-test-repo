'use client';

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apollo-client';
import { AuthProvider } from '../contexts/auth';
import Header from '../components/Header';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Header />
        {children}
      </ApolloProvider>
    </AuthProvider>
  );
}
