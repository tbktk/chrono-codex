'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useTransition } from 'react';
import { TimeLog } from '@/domain/models/timeLog';

type Props = {
  id: string;
};

const TimeLogDetailView = ({ id }: Props) => {
  const [timeLog, setTimeLog] = useState<TimeLog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, startLoadingTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    if (!id) return ;

    const fetchTimeLog = async () => {
      startLoadingTransition(async () => {
        try {
          const response = await fetch(`/api/timelogs/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch time log');
          }
          const data = await response.json();
          setTimeLog(data);
        } catch (error) {
          setError(error instanceof Error ? error.message : 'An unknown error occurred');
        }
      });
    };

    fetchTimeLog();
  }, [id]); // idが変更されるたびに実行される

  const handleDelete = async () => {
    // ユーザーに最終確認を求める
    if (!window.confirm('Are you sure you want to delete this time log?')) {
      return;
    }

    try {
      const response = await fetch(`/api/timelogs/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete time log');
      }

      alert('Successfully deleted!');
      router.push('/timelogs'); // 削除後は一覧ページに遷移
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      console.error(error);
      alert('Error deleting time log');
    }
  };

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
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Link href="/timelogs" className="text-indigo-600 hover:underline">
          &larr; Back to all logs
        </Link>
        <div className="flex gap-2">
          <Link
            href={`/timelogs/${timeLog.id}/edit`}
            className="inline-block px-4 py-2 text-sm font-semibold text-white bg-indigo-600
              rounded-md shadow-sm hover:bg-indigo-700"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="inline-block px-4 py-2 text-sm font-semibold text-white bg-red-600
              rounded-md shadow-sm hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
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