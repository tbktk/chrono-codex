import { TimeLog } from '@/domain/models/timeLog';

/**
 * タイムログの参照（Query）に関するビジネスロジックを定義するインターフェース。
 * このインターフェースは、システムの状態を変更するメソッドを持ってはならない。
 */
export interface ITimeLogQueryService {
  /**
   * 指定したIDによって単一のタイムログを取得する。
   * @param id 取得するタイムログのID
   * @returns 取得したタイムログ、存在しない場合はnull
   */
  getById(id: string): Promise<TimeLog | null>;

  /**
   * すべてのタイムログを取得する。
   * @returns すべてのタイムログの配列
   */
  getAll(): Promise<TimeLog[]>;
}
