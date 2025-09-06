import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import { ITimeLogRepository } from '@/domain/repositories/ITimeLogRepository';
import { TimeLog } from '@/domain/models/timeLog';
import { randomUUID } from 'crypto';

/**
 * SQLiteを使用してタイムログの永続化を実装するリポジトリ
 */
export class SQLiteTimeLogRepository implements ITimeLogRepository {
  private db: Database | null = null;

  /**
   * データベースへの接続を開く
   * @returns データベースインスタンス
   */
  private async openDb(): Promise<Database> {
    if (this.db) return this.db;

    // 初回のみデータベースへの接続を開く
    // :memory: はインメモリDB、ファイルパスを指定すればファイルに保存される
    this.db = await open({
      filename: './chrono-codex.db',
      driver: sqlite3.Database
    });

    // テーブルが存在しな場合、テーブル作成のSQLを実行
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS timelogs (
        id TEXT PRIMARY KEY,
        description TEXT NOT NULL,
        startTime TEXT NOT NULL,
        endTime TEXT NOT NULL,
      )
    `);

    return this.db;
  }

  /**
   * 新しいタイムログを作成して保存する
   * @param timeLog 作成タイムログのデータ（IDは自動生成されるため含まない）
   * @returns 作成されたタイムログ
   */
  async create(timeLog: Omit<TimeLog, 'id'>): Promise<TimeLog> {
    const db = await this.openDb();
    const newId = randomUUID(); // IDを生成

    const newTimeLog: TimeLog = {
      id: newId,
      ...timeLog,
    };

    // SQLインジェクションを防ぐため、値はプレースホルダで渡す
    await db.run(
      'INSERT INTO timelogs (id, description, startTime, endTime) VALUES (?, ?, ?, ?)',
      newTimeLog.id,
      newTimeLog.description,
      newTimeLog.startTime,
      newTimeLog.endTime,
    );
    return newTimeLog;
  }

  /**
   * 指定したIDによって単一のタイムログを検索する。
   * @param id 検索するタイムログのID
   * @returns 検索結果のタイムログ、存在しない場合はnull
   */
  async findById(id: string): Promise<TimeLog | null> {
    const db = await this.openDb();
    const row = await db.get('SELECT * FROM timelogs WHERE id = ?', id);

    if (!row) return null;

    // DBから取得したデータをTimeLog型に変換して返す
    return {
      id: row.id,
      description: row.description,
      startTime: new Date(row.startTime),
      endTime: new Date(row.endTime),
    };
  }

  /**
   * すべてのタイムログを取得する。
   * @returns すべてのタイムログの配列
   */
  async findAll(): Promise<TimeLog[]> {
    const db = await this.openDb();
    const rows = await db.all('SELECT * FROM timelogs ORDER BY startTime DESC');

    // 取得した全データをTimeLog型に変換して返す
    return rows.map(row => ({
      id: row.id,
      description: row.description,
      startTime: new Date(row.startTime),
      endTime: new Date(row.endTime),
    }));
  }

  /**
   * 指定したIDのタイムログを更新する。
   * @param id 更新するタイムログのID
   * @param data 更新するタイムログのデータ
   * @returns 更新後のタイムログ
   */
  async update(id: string, data: Partial<Omit<TimeLog, 'id'>>): Promise<TimeLog> {
    const db = await this.openDb();

    // 更新するフィールドと値を動的に構築
    const fields = Object.keys(data);
    const values = Object.values(data);
    const setClause = fields.map(field => `${field} = ?`).join(', ');

    if (fields.length === 0) {
      // 更新するデータがない場合は、現在のデータをそのまま返す
      return this.findById(id).then(log => {
        if (!log) throw new Error('Time log not found');
        return log;
      });
    }

    // データベースを更新
    await db.run(
      `UPDATE timelogs SET ${setClause} WHERE id = ?`,
      ...values,
      id,
    );

    // 更新後の最新データを取得して返す
    const updatedLog = await this.findById(id);
    if (!updatedLog) throw new Error('Failed to fetch updated time log');

    return updatedLog;
  }

  /**
   * 指定したIDのタイムログを削除する。
   * @param id 削除するタイムログのID
   */
  async delete(id: string): Promise<void> {
    const db = await this.openDb();
    await db.run('DELETE FROM timelogs WHERE id = ?', id);
  }
}
