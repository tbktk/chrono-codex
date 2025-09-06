/**
 * Dateオブジェクトを、HTMLの<input type="datetime-local">で扱える
 * 'YYYY-MM-DDTHH:mm'形式の文字列に変換します。
 * @param date 変換するDateオブジェクト
 * @returns 'YYYY-MM-DDTHH:mm'形式の文字列
 */
export const formatDateForInput = (date: Date | undefined): string => {
  if (!date) return '';
  return new Date(date).toISOString().slice(0, 16);
};
