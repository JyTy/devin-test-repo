'use client';

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CREATE_NOTE } from '../../../graphql/notes';
import styles from './page.module.css';
import { ApolloWrapper } from '../../../components/ApolloWrapper';

function CreateNoteForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [createNote, { loading, error }] = useMutation(CREATE_NOTE, {
    onCompleted: () => {
      router.push('/');
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createNote({
        variables: {
          input: {
            title: title || null,
            text
          }
        }
      });
    } catch (err) {
      console.error('Error creating note:', err);
    }
  };

  return (
    <div className={styles.formContainer}>
      {error && <div className={styles.error}>Error creating note. Please try again.</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="title" className={styles.label}>Title (optional)</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            placeholder="Enter note title"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="text" className={styles.label}>Content (markdown supported)</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={styles.textarea}
            placeholder="Enter note content (markdown supported)"
            required
            rows={10}
          />
        </div>
        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? 'Creating...' : 'Create Note'}
        </button>
      </form>
    </div>
  );
}

export default function Page() {
  return (
    <ApolloWrapper>
      <div className={styles.container}>
        <Link href="/" className={styles.backButton}>
          ← Back to Notes
        </Link>
        <h1 className={styles.title}>Create New Note</h1>
        <CreateNoteForm />
      </div>
    </ApolloWrapper>
  );
}
