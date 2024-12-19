'use client';

import { ApolloClient, InMemoryCache, ApolloProvider, gql, HttpLink, ApolloLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include',
});

const authLink = new ApolloLink((operation, forward) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
  connectToDevTools: true,
});

export { client, ApolloProvider, gql };
