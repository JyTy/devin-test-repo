import './global.css';
import { Metadata } from 'next';

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
      <body>{children}</body>
    </html>
  );
}
