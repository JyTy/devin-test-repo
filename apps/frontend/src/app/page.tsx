'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GET_NOTES } from '../graphql/notes';
import styles from './page.module.css';
import dynamic from 'next/dynamic';

const ApolloWrapper = dynamic(
  () => import('../components/ApolloWrapper'),
  { ssr: false }
);

interface Note {
  id: string;
  title: string | null;
  created_datetime: string;
}

export default function Index() {
  const { data, loading } = useQuery(GET_NOTES);

  const content = loading ? (
    <div className={styles.loading}>Loading notes...</div>
  ) : (
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

  return (
    <ApolloWrapper>
      <div className={styles.container}>{content}</div>
    </ApolloWrapper>
  );
}
