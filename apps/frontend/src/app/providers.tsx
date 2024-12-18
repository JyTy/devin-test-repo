'use client';

import React from 'react';
import { ApolloProvider, client } from '../lib/apollo-client';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
