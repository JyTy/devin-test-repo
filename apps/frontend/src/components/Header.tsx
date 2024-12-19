'use client';

import Link from 'next/link';
import { useAuth } from '../contexts/auth';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-slate-800">Notes App</Link>
        <div>
          {user ? (
            <button onClick={logout} className="text-slate-600 hover:text-slate-800">
              Logout
            </button>
          ) : (
            <Link href="/login" className="text-blue-500 hover:text-blue-600">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
