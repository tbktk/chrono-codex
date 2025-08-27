export type TimeLog = {
  id: string;          // ログの一意なID
  description: string; // 作業内容
  startTime: Date;     // 開始時刻
  endTime: Date;       // 終了時刻
};