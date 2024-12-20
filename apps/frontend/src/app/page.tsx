'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { GET_NOTES } from '../graphql/notes';
import { ApolloWrapper } from '../components/ApolloWrapper';

interface Note {
  id: string;
  title: string | null;
  created_datetime: string;
}

function NotesList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const currentPage = Number(pageParam) || 1;

  // Handle browser history state
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const page = event.state?.page || 1;
      if (page !== currentPage) {
        router.replace(`/?page=${page}`);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentPage, router]);

  // Navigation function
  const navigateToPage = (page: number) => {
    window.history.pushState({ page }, '', page === 1 ? '/' : `/?page=${page}`);
    router.replace(`/?page=${page}`);
  };

  const { data, loading, error } = useQuery(GET_NOTES, {
    variables: { skip: (currentPage - 1) * 5, take: 5 }
  });

  // Redirect invalid page numbers
  useEffect(() => {
    const totalPages = Math.ceil(data?.notes.total / 5) || 1;
    if (pageParam && (isNaN(Number(pageParam)) || Number(pageParam) < 1 || Number(pageParam) > totalPages)) {
      navigateToPage(1);
    }
  }, [pageParam, data?.notes.total]);

  if (error) {
    console.error('GraphQL Error:', error);
    return <div className="text-center p-8 text-red-600">Error loading notes. Please try again later.</div>;
  }

  if (loading) {
    return <div className="text-center p-8 text-slate-600">Loading notes...</div>;
  }

  const totalPages = Math.ceil(data?.notes.total / 5) || 1;

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        {data?.notes.notes.map((note: Note) => (
          <Link
            key={note.id}
            href={`/notes/${note.id}`}
            onClick={() => {
              window.history.pushState({ page: currentPage }, '', `/notes/${note.id}`);
            }}
            className="no-underline"
          >
            <div className="p-6 border border-slate-200 rounded-lg bg-white hover:translate-y-[-2px] transition-all hover:shadow-md cursor-pointer">
              <h2 className="text-xl text-slate-700 m-0">{note.title || 'Untitled Note'}</h2>
              <div className="mt-2 text-sm text-slate-500">
                {new Date(note.created_datetime).toLocaleDateString()}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-8 mb-8">
        <button
          onClick={() => navigateToPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-slate-100 rounded-md hover:bg-slate-200 disabled:opacity-50 disabled:hover:bg-slate-100"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => navigateToPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage >= totalPages}
          className="px-4 py-2 bg-slate-100 rounded-md hover:bg-slate-200 disabled:opacity-50 disabled:hover:bg-slate-100"
        >
          Next
        </button>
      </div>

      <Link href="/notes/new" className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
        Create New Note
      </Link>
    </>
  );
}

export default function Page() {
  return (
    <ApolloWrapper>
      <div className="flex flex-col items-center min-h-screen p-8 max-w-3xl mx-auto">
        <NotesList />
      </div>
    </ApolloWrapper>
  );
}
