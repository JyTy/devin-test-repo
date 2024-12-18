'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CREATE_NOTE } from '../../../graphql/notes';
import styles from './page.module.css';
import { ApolloWrapper } from '../../../components/ApolloWrapper';

interface NoteFormData {
  title?: string;
  text: string;
}

function CreateNoteForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<NoteFormData>();

  const [createNote, { error }] = useMutation(CREATE_NOTE, {
    onCompleted: () => {
      router.push('/');
    }
  });

  const onSubmit = async (data: NoteFormData) => {
    try {
      await createNote({
        variables: {
          input: {
            title: data.title || null,
            text: data.text
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
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="title" className={styles.label}>Title (optional)</label>
          <input
            id="title"
            type="text"
            {...register('title')}
            className={styles.input}
            placeholder="Enter note title"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="text" className={styles.label}>Content (markdown supported)</label>
          <textarea
            id="text"
            {...register('text', { required: 'Content is required' })}
            className={`${styles.textarea} ${errors.text ? styles.error : ''}`}
            placeholder="Enter note content (markdown supported)"
            rows={10}
          />
          {errors.text && <span className={styles.errorText}>{errors.text.message}</span>}
        </div>
        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
          {isSubmitting ? 'Creating...' : 'Create Note'}
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
