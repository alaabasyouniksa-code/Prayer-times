import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { formatTime } from '../utils/prayerTimes';

const PrayerItem = ({ name, time, isNext }) => {
  return (
    <View style={[styles.container, isNext && styles.activeContainer]}>
      <Text style={[styles.text, isNext && styles.activeText]}>{name}</Text>
      <Text style={[styles.text, isNext && styles.activeText]}>{formatTime(time)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: SIZES.base,
    borderRadius: SIZES.borderRadius,
  },
  activeContainer: {
    backgroundColor: COLORS.accent,
  },
  text: {
    color: COLORS.white,
    fontSize: SIZES.h3,
    fontWeight: '500',
  },
  activeText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default PrayerItem;
