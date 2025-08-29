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

    // TODO: テーブルが存在しない場合に作成する処理をここに追加する

    return this.db;
  }

  /**
   * 新しいタイムログを作成して保存する
   * @param timeLog 作成タイムログのデータ（IDは自動生成されるため含まない）
   * @returns 作成されたタイムログ
   */
  async create(timeLog: Omit<TimeLog, 'id'>): Promise<TimeLog> {
    const db = await this.openDb();
    const id = randomUUID(); // IDを生成

    const newTimeLog = { id, ...timeLog };

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
    // ...実装は後ほど
    throw new Error('Method not implemented.');
  }

  /**
   * すべてのタイムログを取得する。
   * @returns すべてのタイムログの配列
   */
  async findAll(): Promise<TimeLog[]> {
    // ...実装は後ほど
    throw new Error('Method not implemented.');
  }

  /**
   * 指定したIDのタイムログを更新する。
   * @param id 更新するタイムログのID
   * @param data 更新するタイムログのデータ
   * @returns 更新後のタイムログ
   */
  async update(id: string, data: Partial<Omit<TimeLog, 'id'>>): Promise<TimeLog> {
    // ...実装は後ほど
    throw new Error('Method not implemented.');
  }

  /**
   * 指定したIDのタイムログを削除する。
   * @param id 削除するタイムログのID
   * @returns 削除が成功した場合はtrue、失敗した場合はfalse
   */
  async delete(id: string): Promise<boolean> {
    // ...実装は後ほど
    throw new Error('Method not implemented.');
  }
}
