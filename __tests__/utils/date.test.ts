import { formatDateForInput } from '@/utils/date';

describe('formatDateForInput', () => {
  it('should format a Date object correctly', () => {
    const date = new Date(Date.UTC(2025, 8, 7, 14, 30, 0));
    const formattedDate = formatDateForInput(date);
    console.log('Result variable is:', formattedDate);
    expect(formattedDate).toBe('2025-09-07T14:30');
  });

  it('should return an empty string if date is null or invalid', () => {
    expect(formatDateForInput(null)).toBe('');
  });
});