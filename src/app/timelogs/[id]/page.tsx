import TimeLogDetailView from './view';

type Props = {
  params: { id: string };
};

const TimeLogDetailPage = async ({ params }: Props) => {
  const response = await fetch(`/api/timelogs/${params.id}`, {
    cache: 'no-store', // 常に最新のデータを取得
  });
  if (!response.ok) {
    throw new Error('Failed to fetch time log');
  }
  const timeLog = await response.json();
  return <TimeLogDetailView timeLog={timeLog} />
};

export default TimeLogDetailPage;