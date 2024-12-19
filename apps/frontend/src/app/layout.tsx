import './global.css';
import { Metadata } from 'next';
import ClientProviders from '../components/ClientProviders';
import Header from '../components/Header';

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
        <ClientProviders>
          <Header />
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
