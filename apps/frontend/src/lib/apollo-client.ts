'use client';

import { ApolloClient, InMemoryCache, ApolloProvider, gql, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
  connectToDevTools: true,
});

export { client, ApolloProvider, gql };
