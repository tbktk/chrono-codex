'use client';

import { useRouter } from 'next/navigation';
import { TimeLog } from '@/domain/models/timeLog';
import TimeLogForm from '@/components/TimeLogForm';

type Props = {
  timeLog: TimeLog;
};

const EditTimeLogView = ({ timeLog }: Props) => {
  const router = useRouter();

  const handleUpdate = async (data: Omit<TimeLog, 'id'>) => {
    try {
      const response = await fetch(`/api/timelogs/${timeLog.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update time log');

      console.log('Successfully updated:', data);
      alert('Updated!');
      router.push(`/timelogs/${timeLog.id}`); // 更新後は詳細ページに遷移
    } catch (error) {
      console.error(error);
      alert('Error failed.');
    }
  };

  // 新規作成フォームと同じUIを使い回す
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Time Log</h1>
      {timeLog && (
        <TimeLogForm
          initialData={timeLog}
          onSubmit={handleUpdate}
          buttonText="Update Log"
        />
      )}
    </main>
  );
};

export default EditTimeLogView;