'use client';

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apollo-client';
import { AuthProvider } from '../contexts/auth';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ApolloProvider>
  );
}
