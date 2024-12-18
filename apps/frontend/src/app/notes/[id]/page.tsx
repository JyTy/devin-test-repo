'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GET_NOTE } from '../../../graphql/notes';
import styles from './page.module.css';
import { ApolloWrapper } from '../../../components/ApolloWrapper';
import ReactMarkdown from 'react-markdown';

function NoteDetail({ id }: { id: string }) {
  const { data, loading, error } = useQuery(GET_NOTE, {
    variables: { id }
  });

  if (error) {
    console.error('GraphQL Error:', error);
    return <div className={styles.error}>Error loading note. Please try again later.</div>;
  }

  if (loading) {
    return <div className={styles.loading}>Loading note...</div>;
  }

  return (
    <div className={styles.noteContent}>
      <h1 className={styles.title}>{data.note.title || 'Untitled Note'}</h1>
      <div className={styles.metadata}>
        Created: {new Date(data.note.created_datetime).toLocaleDateString()}
        {data.note.updated_datetime && (
          <span> • Updated: {new Date(data.note.updated_datetime).toLocaleDateString()}</span>
        )}
      </div>
      <div className={styles.markdownContent}>
        <ReactMarkdown>{data.note.text}</ReactMarkdown>
      </div>
    </div>
  );
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <ApolloWrapper>
      <div className={styles.container}>
        <Link href="/" className={styles.backButton}>
          ← Back to Notes
        </Link>
        <NoteDetail id={params.id} />
      </div>
    </ApolloWrapper>
  );
}
