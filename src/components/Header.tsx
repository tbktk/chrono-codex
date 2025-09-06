'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          📖 ChronoCodex
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-600 hover:text-indigo-600">
            Dashboard
          </Link>
          <Link href="/timelogs" className="text-gray-600 hover:text-indigo-600">
            Time Logs
          </Link>
          {status === 'loading' ? (
            <div>Loading...</div>
          ) : session ? (
            <div className="flex items-center gap-2">
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name || 'User Avatar'}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span className="text-sm font-medium">{session.user?.name}</span>]
              <button
                onClick={() => signOut()}
                className="px-3 py-1 text-sm font-semibold bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn('github')}
              className="px-3 py-1 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;