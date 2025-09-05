'use client';

import React, { useState } from 'react';
import { TimeLog } from '@/domain/models/timeLog';
import { formatDateForInput } from '@/utils/date';

type Props = {
  initialData?: Omit<TimeLog, 'id'> & { id?: string }; // 編集時は初期データを受け取る
  onSubmit: (data: Omit<TimeLog, 'id'>) => Promise<void>; // フォーム送信時のコールバック
  buttonText: string; // ボタンの文言
  isSaving?: boolean; // 保存中の状態
};

const TimeLogForm = ({ initialData, onSubmit, buttonText, isSaving = false }: Props) => {
  // フォームの状態を管理
  const [description, setDescription] = useState(initialData?.description || '');
  const [startTime, setStartTime] = useState(formatDateForInput(initialData?.startTime) || '');
  const [endTime, setEndTime] = useState(formatDateForInput(initialData?.endTime) || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      description,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
            focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
          Start Time
        </label>
        <input
          type="datetime-local"
          id="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
            focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
          End Time
        </label>
        <input
          type="datetime-local"
          id="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
            focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={isSaving}
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600
          px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none
          focus:ring-2 focus:ring-offset-2"
      >
        {isSaving ? 'Saving...' : buttonText}
      </button>
    </form>
  );
};

export default TimeLogForm;