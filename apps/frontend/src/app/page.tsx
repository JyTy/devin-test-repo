'use client';

import dynamic from 'next/dynamic';

const ApolloWrapper = dynamic(
  () => import('../components/ApolloWrapper'),
  { ssr: false }
);

export default function Index() {
  return (
    <ApolloWrapper>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <h1>Notes App</h1>
      </div>
    </ApolloWrapper>
  );
}
