'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import TimeLogForm from '@/components/TimeLogForm';
import { TimeLog } from '@/domain/models/timeLog';

const NewTimeLogPage = () => {
  const router = useRouter();
  const [isSaving, startSaving] = useTransition();

  const handleCreate = async (data: Omit<TimeLog, 'id'>) => {
    startSaving(async () => {
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
    });
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Time Log</h1>
      <TimeLogForm onSubmit={handleCreate} buttonText="Create Log" isSaving={isSaving} />
    </main>
  );
};

export default NewTimeLogPage;