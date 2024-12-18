'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CREATE_NOTE } from '../../../graphql/notes';
import { ApolloWrapper } from '../../../components/ApolloWrapper';
import { ForwardRefEditor } from '../../../components/ForwardRefEditor';
import '@mdxeditor/editor/style.css';

interface NoteFormData {
  title?: string;
  text: string;
}

function CreateNoteForm() {
  const router = useRouter();
  const {
    register,
    control,
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
          title: data.title || null,
          text: data.text
        }
      });
    } catch (err) {
      console.error('Error creating note:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm">
      {error && <div className="p-4 mb-4 bg-red-50 border border-red-400 rounded-md text-red-700">Error creating note. Please try again.</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-medium text-slate-700">Title (optional)</label>
          <input
            id="title"
            type="text"
            {...register('title')}
            className="p-3 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter note title"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="text" className="text-sm font-medium text-slate-700">Content</label>
          <Controller
            name="text"
            control={control}
            rules={{ required: 'Content is required' }}
            render={({ field }) => (
              <ForwardRefEditor
                markdown={field.value || ''}
                onChange={field.onChange}
              />
            )}
          />
          {errors.text && <span className="text-sm text-red-600">{errors.text.message}</span>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Creating...' : 'Create Note'}
        </button>
      </form>
    </div>
  );
}

export default function Page() {
  return (
    <ApolloWrapper>
      <div className="max-w-3xl mx-auto p-8">
        <Link href="/" className="inline-block mb-4 text-blue-500 hover:text-blue-600 transition-colors">
          ← Back to Notes
        </Link>
        <h1 className="text-3xl text-slate-700 mb-8">Create New Note</h1>
        <CreateNoteForm />
      </div>
    </ApolloWrapper>
  );
}
