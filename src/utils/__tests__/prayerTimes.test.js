import { calculatePrayerTimes, formatTime, getNextPrayer } from '../prayerTimes';

describe('Prayer Times Utility', () => {
  const latitude = 21.4225; // Makkah
  const longitude = 39.8262;

  it('calculates prayer times correctly', () => {
    const times = calculatePrayerTimes(latitude, longitude, 'Makkah', 'Shafi');
    expect(times).toHaveProperty('fajr');
    expect(times).toHaveProperty('dhuhr');
    expect(times).toHaveProperty('asr');
    expect(times).toHaveProperty('maghrib');
    expect(times).toHaveProperty('isha');

    // Check if they are Date objects
    expect(times.fajr).toBeInstanceOf(Date);
  });

  it('formats time correctly', () => {
    const date = new Date('2023-01-01T15:30:00');
    expect(formatTime(date)).toBe('3:30 PM');
  });

  it('determines next prayer', () => {
      // Mock calculation logic output for predictability if needed,
      // but here we just test the structure
      const times = calculatePrayerTimes(latitude, longitude, 'Makkah', 'Shafi');
      const next = getNextPrayer(times);
      expect(next).toHaveProperty('name');
      expect(next).toHaveProperty('time');
  });
});
