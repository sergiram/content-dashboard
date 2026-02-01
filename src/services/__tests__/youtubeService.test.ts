import { describe, it, expect } from 'vitest';
import { formatNumber } from '../youtubeService';

describe('formatNumber', () => {
  it('should return the same number as string if less than 1000', () => {
    expect(formatNumber(500)).toBe('500');
    expect(formatNumber(999)).toBe('999');
  });

  it('should format thousands with K', () => {
    expect(formatNumber(1000)).toBe('1.0K');
    expect(formatNumber(1500)).toBe('1.5K');
    expect(formatNumber(10000)).toBe('10.0K');
    expect(formatNumber(999000)).toBe('999.0K');
  });

  it('should format millions with M', () => {
    expect(formatNumber(1000000)).toBe('1.0M');
    expect(formatNumber(1500000)).toBe('1.5M');
    expect(formatNumber(10500000)).toBe('10.5M');
  });
});
