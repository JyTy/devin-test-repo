'use client';

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apollo-client';
import { AuthProvider } from '../contexts/auth';

// This component is deprecated, use ClientProviders.tsx instead
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </AuthProvider>
  );
}
