import { TimeLog } from '@/domain/models/timeLog';

// コマンドの入力データを定義するための型。
// これにより、どのようなデータを受け取るのかが明確になる。
export type CreateTimeLogCommand = Omit<TimeLog, 'id'>;
export type UpdateTimeLogCommand = Partial<Omit<TimeLog, 'id'>>;

/**
 * タイムログの操作（Command）に関するビジネスロジックを定義するインターフェース。
 * このインターフェースは、システムの状態を変更するメソッドのみを持つ。
 */
export interface ITimeLogCommandService {
  /**
   * 新しいタイムログを作成する。
   * @param command 作成するタイムログのデータ
   * @returns 作成されたタイムログ
   */
  create(command: CreateTimeLogCommand): Promise<TimeLog>;
  /**
   * 指定したIDのタイムログを更新する。
   * @param id 更新するタイムログのID
   * @param command 更新するタイムログのデータ
   * @returns 更新されたタイムログ
   */
  update(id: string, command: UpdateTimeLogCommand): Promise<TimeLog>;
  /**
   * 指定したIDのタイムログを削除する。
   * @param id 削除するタイムログのID
   * @returns 削除が成功した場合はtrue、失敗した場合はfalse
   */
  delete(id: string): Promise<boolean>;
}
