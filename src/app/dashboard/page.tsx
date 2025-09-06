import TimeLogPieChart from '@/components/TimeLogPieChart';
import { SQLiteTimeLogRepository } from '@/infrastructure/repositories/SQLiteTimeLogRepository';
import type { TimeLog } from '@/domain/models/timeLog';

const DashboardPage = async () => {
  const timeLogRepository = new SQLiteTimeLogRepository();
  const allLogs = await timeLogRepository.findAll();

  // descriptionごとの合計時間を計算
  const timeByDescription: Record<string, number> = {};
  allLogs.forEach((log: TimeLog) => {
    const duration = new Date(log.endTime).getTime() - new Date(log.startTime).getTime();
    // ミリ秒を時間に変換
    const durationHours = duration / (1000 * 60 * 60);

    if (timeByDescription[log.description]) {
      timeByDescription[log.description] += durationHours;
    } else {
      timeByDescription[log.description] = durationHours;
    }
  });

  // Chart.jsが期待する形式にデータを変換
  const labels = Object.keys(timeByDescription);
  const data = Object.values(timeByDescription).map(hours => parseFloat(hours.toFixed(2))); // 小数点以下2桁に丸める

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {allLogs.length > 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md shadow-md max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-center">Time Spent by Task (Hours)</h2>
          <TimeLogPieChart labels={labels} data={data} />
        </div>
      ) : (
        <p>No data available to display. Please create some time logs first.</p>
      )}
    </main>
  );
};

export default DashboardPage;