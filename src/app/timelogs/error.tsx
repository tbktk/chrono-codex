'use client';

import { useEffect } from 'react';

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto p-4 text-center">
      <h2 className="text-2xl font-bold mb-4 text-red-600">
        Something went wrong!
      </h2>
      <p className="text-gray-700 mb-6">
        Failed to load time logs. Please try again.
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
      >
        Try Again
      </button>
    </div>
  );
};

export default Error;