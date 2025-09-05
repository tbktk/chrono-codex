'use client';

import TimeLogForm from '@/components/TimeLogForm';
import { TimeLog } from '@/domain/models/timeLog';
import { useRouter } from 'next/navigation';

const NewTimeLogPage = () => {
  const router = useRouter();

  const handleCreate = async (data: Omit<TimeLog, 'id'>) => {
    try {
      const response = await fetch('/api/timelogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to save');

      const newLog = await response.json();
      console.log('Successfully saved:', newLog);
      alert('Saved!');
      router.push(`/timelogs/${newLog.id}`);
    } catch (error) {
      console.error(error);
      alert('Error saving time log');
    }
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Time Log</h1>
      <TimeLogForm onSubmit={handleCreate} buttonText="Create Log" />
    </main>
  );
};

export default NewTimeLogPage;