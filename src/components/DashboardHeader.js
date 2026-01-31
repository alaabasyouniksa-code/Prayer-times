import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { getGregorianDate, getHijriDate } from '../utils/prayerTimes';

const DashboardHeader = ({ nextPrayer }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (!nextPrayer) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = nextPrayer.time - now;

      if (diff <= 0) {
        setTimeLeft('Now');
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextPrayer]);

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{getGregorianDate()}</Text>
      <Text style={styles.hijri}>{getHijriDate()}</Text>

      <View style={styles.countdownContainer}>
        <Text style={styles.nextLabel}>Next Prayer: {nextPrayer?.name}</Text>
        <Text style={styles.timer}>{timeLeft}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: SIZES.padding * 2,
  },
  date: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body,
    marginBottom: 4,
  },
  hijri: {
    color: COLORS.white,
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    marginBottom: SIZES.padding,
  },
  countdownContainer: {
    alignItems: 'center',
    marginTop: SIZES.padding,
  },
  nextLabel: {
    color: COLORS.accent,
    fontSize: SIZES.h3,
    fontWeight: '600',
    marginBottom: SIZES.base,
  },
  timer: {
    color: COLORS.white,
    fontSize: 48, // Large timer
    fontWeight: 'bold',
  },
});

export default DashboardHeader;
