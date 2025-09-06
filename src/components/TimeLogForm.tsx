'use client';

import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ja } from 'date-fns/locale/ja'; // 日本語ロケールをインポート
import { TimeLog } from '@/domain/models/timeLog';
// import { formatDateForInput } from '@/utils/date';

registerLocale('ja', ja); // 日本語ロケールを登録

type Props = {
  initialData?: Omit<TimeLog, 'id'> & { id?: string }; // 編集時は初期データを受け取る
  onSubmit: (data: Omit<TimeLog, 'id'>) => Promise<void>; // フォーム送信時のコールバック
  buttonText: string; // ボタンの文言
  isSaving?: boolean; // 保存中の状態
};

const TimeLogForm = ({ initialData, onSubmit, buttonText, isSaving = false }: Props) => {
  // フォームの状態を管理
  const [description, setDescription] = useState(initialData?.description || '');
  // const [startTime, setStartTime] = useState(formatDateForInput(initialData?.startTime) || '');
  // const [endTime, setEndTime] = useState(formatDateForInput(initialData?.endTime) || '');
  const [startTime, setStartTime] = useState<Date | null>(initialData?.startTime || null);
  const [endTime, setEndTime] = useState<Date | null>(initialData?.endTime || null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startTime || !endTime) {
      alert('Please select both start and end times.');
      return;
    }
    onSubmit({
      description,
      startTime,
      endTime,
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
        <DatePicker
          selected={startTime}
          onChange={(date) => setStartTime(date)}
          locale="ja"
          showTimeSelect
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="yyyy/MM/dd HH:mm"
          isClearable
          todayButton="Today"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
            focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          wrapperClassName='w-full'
        />
      </div>
      <div>
        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
          End Time
        </label>
        <DatePicker
          selected={endTime}
          onChange={(date) => setEndTime(date)}
          locale="ja"
          showTimeSelect
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="yyyy/MM/dd HH:mm"
          isClearable
          todayButton="Today"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
            focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          wrapperClassName='w-full'
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