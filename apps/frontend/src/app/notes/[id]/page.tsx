'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { GET_NOTE } from '../../../graphql/notes';
import { ApolloWrapper } from '../../../components/ApolloWrapper';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../../../contexts/auth';

function NoteDetail({ id }: { id: string }) {
  const { user } = useAuth();
  const { data, loading, error } = useQuery(GET_NOTE, {
    variables: { id }
  });

  if (error) {
    console.error('GraphQL Error:', error);
    return <div className="text-center p-8 text-red-600">Error loading note. Please try again later.</div>;
  }

  if (loading) {
    return <div className="text-center p-8 text-slate-600">Loading note...</div>;
  }

  if (!user && data?.note) {
    return (
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <h1 className="text-3xl text-slate-700 mb-4">{data.note.title || 'Untitled Note'}</h1>
        <div className="text-sm text-slate-500 mb-8">
          Created: {new Date(data.note.created_datetime).toLocaleDateString()}
        </div>
        <div className="prose prose-slate">
          <p className="text-center py-8">
            Please <Link href="/login" className="text-blue-500 hover:text-blue-600">login</Link> to view the full note.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm">
      <h1 className="text-3xl text-slate-700 mb-4">{data.note.title || 'Untitled Note'}</h1>
      <div className="text-sm text-slate-500 mb-8">
        Created: {new Date(data.note.created_datetime).toLocaleDateString()}
        {data.note.updated_datetime && (
          <span> • Updated: {new Date(data.note.updated_datetime).toLocaleDateString()}</span>
        )}
      </div>
      <div className="prose prose-slate">
        <ReactMarkdown>{data.note.text}</ReactMarkdown>
      </div>
    </div>
  );
}

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromPage = searchParams.get('page') || window.history.state?.page || '1';

  useEffect(() => {
    if (!window.history.state?.page) {
      window.history.replaceState({ page: fromPage }, '', '');
    }
  }, [fromPage]);

  return (
    <ApolloWrapper>
      <div className="max-w-3xl mx-auto p-8">
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            const page = window.history.state?.page || '1';
            router.push(`/?page=${page}`);
          }}
          className="inline-block mb-8 text-blue-500 hover:text-blue-600 transition-colors"
        >
          ← Back to Notes
        </Link>
        <NoteDetail id={params.id} />
      </div>
    </ApolloWrapper>
  );
}
