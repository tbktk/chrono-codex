'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TimeLog } from '@/domain/models/timeLog';
import TimeLogForm from '@/components/TimeLogForm';

type Props = {
  id: string;
};

const EditTimeLogView = ({ id }: Props) => {
  const router = useRouter();

  const [initialData, setInitialData] = useState<TimeLog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. 最初に既存のデータを取得してフォームにセット
  useEffect(() => {
    if (!id) return;

    const fetchTimeLog = async () => {
      try {
        const response = await fetch(`/api/timelogs/${id}`);
        if (!response.ok) throw new Error('Failed to fetch time log');
        setInitialData(await response.json());
      } catch (error) {
        console.error(error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimeLog();
  }, [id]);

  // 2. フォームの送信処理
  const handleUpdate = async (data: Omit<TimeLog, 'id'>) => {
    try {
      const response = await fetch(`/api/timelogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update time log');

      console.log('Successfully updated:', data);
      alert('Updated!');
      router.push(`/timelogs/${id}`); // 更新後は詳細ページに遷移
    } catch (error) {
      console.error(error);
      alert('Error failed.');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div className="text-red-500">Error: {error}</div>;

  // 新規作成フォームと同じUIを使い回す
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Time Log</h1>
      {initialData && (
        <TimeLogForm
          initialData={initialData}
          onSubmit={handleUpdate}
          buttonText="Update Log"
        />
      )}
    </main>
  );
};

export default EditTimeLogView;