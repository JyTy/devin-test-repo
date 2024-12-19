import './global.css';
import { Metadata } from 'next';
import { AuthProvider } from '../contexts/auth';
import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apollo-client';

export const metadata: Metadata = {
  title: 'Notes App',
  description: 'A simple notes application with GraphQL',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ApolloProvider client={client}>
            {children}
          </ApolloProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
