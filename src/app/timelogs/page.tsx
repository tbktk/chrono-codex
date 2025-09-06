'use client';

import { useState, useEffect, useTransition } from 'react';
import Link from 'next/link';

import type { TimeLog } from '@/domain/models/timeLog';

const TimeLogPage = () => {
  const [timeLogs, setTimeLogs] = useState<TimeLog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, startLoadingTransition] = useTransition();

  useEffect(() => {
    // ページが読み込まれたらAPIからデータを取得
    const fetchTimeLogs = async () => {
      startLoadingTransition(async () => {
        try {
          const response = await fetch('/api/timelogs');
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setTimeLogs(data);
        } catch (error) {
          console.error('Failed to fetch time logs:', error);
          setError(error instanceof Error ? error.message : 'An unknown error occurred');
        }
      });
    };

    fetchTimeLogs();
  }, []); // 空の配列を渡すことで、この処理はコンポーネントの初回マウント時に一度だけ実行される

  if (isLoading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Time Logs</h1>
      <div className="space-y-4">
        {timeLogs.length > 0 ? (
          timeLogs.map((log) => (
            <Link href={`/timelogs/${log.id}`} key={log.id} className="block hover:bg-gray-50">
              <div className="p-4 border rounded-md shadow-sm bg-white">
                <p className="font-semibold text-gray-800">{log.description}</p>
                <div className="text-sm text-gray-500 mt-2">
                  <p>Start: {new Date(log.startTime).toLocaleString()}</p>
                  <p>End: {new Date(log.endTime).toLocaleString()}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No time logs found. Create one!</p>
        )}
      </div>
    </main>
  );
};

export default TimeLogPage;