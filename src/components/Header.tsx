import Link from 'next/link';

export const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          📖 ChronoCodex
        </Link>
        <div>
          <Link href="/timelogs" className="text-gray-600 hover:text-indigo-600">
            Time Logs
          </Link>
        </div>
      </nav>
    </header>
  );
};