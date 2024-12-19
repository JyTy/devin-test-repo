'use client';

import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { CREATE_NOTE } from '../../../graphql/notes';
import { useAuth } from '../../../contexts/auth';
import { ApolloWrapper } from '../../../components/ApolloWrapper';
import dynamic from 'next/dynamic';

const MDXEditor = dynamic(
  () => import('@mdxeditor/editor').then((mod) => mod.MDXEditor),
  { ssr: false }
);

function CreateNoteForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user, isVerified } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (!isVerified) {
      alert('Please verify your email first');
      router.push('/');
    }
  }, [user, isVerified, router]);

  const [createNote, { loading, error }] = useMutation(CREATE_NOTE, {
    onCompleted: () => {
      router.push('/');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createNote({
        variables: {
          title,
          text: content,
        },
      });
    } catch (err) {
      console.error('Error creating note:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content
        </label>
        <MDXEditor
          onChange={setContent}
          markdown={content}
          contentEditableClassName="min-h-[300px] border rounded-md p-4"
        />
      </div>
      {error && (
        <div className="text-red-600">
          {error.message}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Note'}
      </button>
    </form>
  );
}

export default function Page() {
  return (
    <ApolloWrapper>
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Create New Note</h1>
        <CreateNoteForm />
      </div>
    </ApolloWrapper>
  );
}
