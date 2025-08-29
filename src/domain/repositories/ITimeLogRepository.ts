import { TimeLog } from '@/domain/models/timeLog';

/**
 * タイムログのデータ永続化を抽象化するリポジトリのインターフェース。
 * この「契約書」に定められたメソッドを実装することで、
 * データベースがSQLiteであろうとPostgreSQLであろうと、
 * アプリケーションの他の部分はそれを意識する必要がなくなる。
 */
export interface ITimeLogRepository {
  /**
   * 新しいタイムログを作成する。
   * @param data 作成タイムログのデータ（IDは自動生成されるため含まない）
   * @returns 作成されたタイムログ
   */
  create(data: Omit<TimeLog, 'id'>): Promise<TimeLog>;
  /**
   * 指定したIDによって単一のタイムログを検索する。
   * @param id 検索するタイムログのID
   * @returns 検索結果のタイムログ、存在しない場合はnull
   */
  findById(id: string): Promise<TimeLog | null>;
  /**
   * すべてのタイムログを取得する。
   * @returns すべてのタイムログの配列
   */
  findAll(): Promise<TimeLog[]>;
  /**
   * 指定したIDのタイムログを更新する。
   * @param id 更新するタイムログのID
   * @param data 更新するタイムログのデータ
   * @returns 更新後のタイムログ
   */
  update(id: string, data: Partial<Omit<TimeLog, 'id'>>): Promise<TimeLog>;
  /**
   * 指定したIDのタイムログを削除する。
   * @param id 削除するタイムログのID
   * @returns 削除が成功した場合はtrue、失敗した場合はfalse
   */
  delete(id: string): Promise<boolean>;
}
