import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { calculatePrayerTimes, getNextPrayer } from '../utils/prayerTimes';
import { useSettings } from '../hooks/useSettings';
import { COLORS, SIZES } from '../constants/theme';
import PrayerItem from '../components/PrayerItem';
import DashboardHeader from '../components/DashboardHeader';

export default function Dashboard() {
  const { calculationMethod, asrMethod, loading: settingsLoading } = useSettings();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (location && !settingsLoading) {
      const times = calculatePrayerTimes(
        location.coords.latitude,
        location.coords.longitude,
        calculationMethod,
        asrMethod
      );
      setPrayerTimes(times);
      setNextPrayer(getNextPrayer(times));
      setLoading(false);
    }
  }, [location, calculationMethod, asrMethod, settingsLoading]);

  // Periodic update for next prayer check
  useEffect(() => {
    if(!prayerTimes) return;
    const timer = setInterval(() => {
        setNextPrayer(getNextPrayer(prayerTimes));
    }, 60000); // Check every minute
    return () => clearInterval(timer);
  }, [prayerTimes]);

  if (loading || settingsLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.loadingText}>Loading Prayer Times...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.appTitle}>Prayer Times</Text>
        <Link href="/settings" asChild>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </Link>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <DashboardHeader nextPrayer={nextPrayer} />

        <View style={styles.listContainer}>
          <PrayerItem name="Fajr" time={prayerTimes?.fajr} isNext={nextPrayer?.name === 'Fajr'} />
          <PrayerItem name="Dhuhr" time={prayerTimes?.dhuhr} isNext={nextPrayer?.name === 'Dhuhr'} />
          <PrayerItem name="Asr" time={prayerTimes?.asr} isNext={nextPrayer?.name === 'Asr'} />
          <PrayerItem name="Maghrib" time={prayerTimes?.maghrib} isNext={nextPrayer?.name === 'Maghrib'} />
          <PrayerItem name="Isha" time={prayerTimes?.isha} isNext={nextPrayer?.name === 'Isha'} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SIZES.padding,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.base,
  },
  appTitle: {
    color: COLORS.white,
    fontSize: SIZES.h3,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    color: COLORS.white,
    marginTop: SIZES.base,
  },
  errorText: {
    color: COLORS.error,
    textAlign: 'center',
  },
  listContainer: {
    marginTop: SIZES.padding,
  },
});
