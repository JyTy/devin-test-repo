'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GET_NOTES } from '../graphql/notes';
import styles from './page.module.css';
import { ApolloWrapper } from '../components/ApolloWrapper';

interface Note {
  id: string;
  title: string | null;
  created_datetime: string;
}

function NotesList() {
  const { data, loading, error } = useQuery(GET_NOTES);

  if (error) {
    console.error('GraphQL Error:', error);
    return <div className={styles.error}>Error loading notes. Please try again later.</div>;
  }

  if (loading) {
    return <div className={styles.loading}>Loading notes...</div>;
  }

  return (
    <>
      <div className={styles.noteList}>
        {data?.notes.map((note: Note) => (
          <Link key={note.id} href={`/notes/${note.id}`} style={{ textDecoration: 'none' }}>
            <div className={styles.noteItem}>
              <h2 className={styles.noteTitle}>{note.title || 'Untitled Note'}</h2>
              <div className={styles.noteDate}>
                {new Date(note.created_datetime).toLocaleDateString()}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link href="/notes/new" className={styles.createButton}>
        Create New Note
      </Link>
    </>
  );
}

export default function Page() {
  return (
    <ApolloWrapper>
      <div className={styles.container}>
        <NotesList />
      </div>
    </ApolloWrapper>
  );
}
