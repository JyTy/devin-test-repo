'use client';

import Link from 'next/link';
import { useAuth } from '../contexts/auth';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-3 items-center">
        <div className="justify-self-start">
          {user && (
            <button onClick={logout} className="text-red-600 hover:text-red-800 transition-colors">
              Logout
            </button>
          )}
        </div>

        <Link href="/" className="text-xl font-bold text-slate-800 justify-self-center">
          Notes App
        </Link>

        <div className="justify-self-end">
          {!user && (
            <Link href="/login" className="text-blue-500 hover:text-blue-600">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
