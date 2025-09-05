'use client';

import { useState, useEffect } from 'react';
import { TimeLog } from '@/domain/models/timeLog';
import Link from 'next/link';

type Props = {
  id: string;
};

const TimeLogDetailView = ({ id }: Props) => {
  const [timeLog, setTimeLog] = useState<TimeLog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return ;

    const fetchTimeLog = async () => {
      try {
        const response = await fetch(`/api/timelogs/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch time log');
        }
        const data = await response.json();
        setTimeLog(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimeLog();
  }, [id]); // idが変更されるたびに実行される

  if (isLoading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;
  }

  if (!timeLog) {
    return <div className="container mx-auto p-4">Time log not found.</div>;
  }

  return (
    <main className="p-6 border rounded-md shadow-sm bg-white">
      <Link href="/timelogs" className="text-indigo-600 hover:underline mb-4 inline-block">
        &larr; Back to all logs
      </Link>
      <div className="p-6 border rounded-md shadow-sm bg-white">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{timeLog.description}</h1>
        <div className="text-sm text-gray-600 space-y-2">
          <p><strong>ID:</strong> {timeLog.id}</p>
          <p><strong>Start Time:</strong> {new Date(timeLog.startTime).toLocaleString()}</p>
          <p><strong>End Time:</strong> {new Date(timeLog.endTime).toLocaleString()}</p>
        </div>
      </div>
    </main>
  );
};

export default TimeLogDetailView;