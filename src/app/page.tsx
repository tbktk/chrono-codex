import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Welcome to ChronoCodex 📖✨
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          A living textbook of modern development, in the form of a time-logging app.
        </p>
        <div className="mt-8">
          <Link
            href="/timelogs/new"
            className="inline-block px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
          >
            Create Your First Time Log
          </Link>
        </div>
      </div>
    </main>
  );
}