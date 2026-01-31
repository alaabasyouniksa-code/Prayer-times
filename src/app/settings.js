import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSettings } from '../hooks/useSettings';
import { COLORS, SIZES } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const CalculationMethods = [
  { id: 'MWL', name: 'Muslim World League' },
  { id: 'ISNA', name: 'Islamic Society of North America' },
  { id: 'Egypt', name: 'Egyptian General Authority' },
  { id: 'Makkah', name: 'Umm Al-Qura University, Makkah' },
  { id: 'Karachi', name: 'University of Islamic Sciences, Karachi' },
  { id: 'Tehran', name: 'Institute of Geophysics, University of Tehran' },
];

const AsrMethods = [
  { id: 'Standard', name: 'Standard (Shafi, Maliki, Hanbali)' },
  { id: 'Hanafi', name: 'Hanafi' },
];

export default function Settings() {
  const { calculationMethod, asrMethod, saveSettings } = useSettings();

  const renderOption = (item, current, onSelect) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.option,
        current === item.id && styles.selectedOption
      ]}
      onPress={() => onSelect(item.id)}
    >
      <Text style={[styles.optionText, current === item.id && styles.selectedOptionText]}>
        {item.name}
      </Text>
      {current === item.id && (
        <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Calculation Method</Text>
      <View style={styles.section}>
        {CalculationMethods.map(item =>
          renderOption(item, calculationMethod, (id) => saveSettings(id, null))
        )}
      </View>

      <Text style={styles.sectionTitle}>Asr Calculation</Text>
      <View style={styles.section}>
        {AsrMethods.map(item =>
          renderOption(item, asrMethod, (id) => saveSettings(null, id))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.padding,
  },
  sectionTitle: {
    color: COLORS.accent,
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    marginBottom: SIZES.base,
    marginTop: SIZES.base,
  },
  section: {
    marginBottom: SIZES.padding,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: SIZES.borderRadius,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedOption: {
    backgroundColor: COLORS.accent,
  },
  optionText: {
    color: COLORS.white,
    fontSize: SIZES.body,
    flex: 1,
  },
  selectedOptionText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});
