import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [calculationMethod, setCalculationMethod] = useState('MWL');
  const [asrMethod, setAsrMethod] = useState('Standard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const storedCalcMethod = await AsyncStorage.getItem('calculationMethod');
      const storedAsrMethod = await AsyncStorage.getItem('asrMethod');

      if (storedCalcMethod) setCalculationMethod(storedCalcMethod);
      if (storedAsrMethod) setAsrMethod(storedAsrMethod);
    } catch (e) {
      console.error('Failed to load settings', e);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (calc, asr) => {
    try {
      if (calc) {
        await AsyncStorage.setItem('calculationMethod', calc);
        setCalculationMethod(calc);
      }
      if (asr) {
        await AsyncStorage.setItem('asrMethod', asr);
        setAsrMethod(asr);
      }
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  };

  return (
    <SettingsContext.Provider value={{ calculationMethod, asrMethod, saveSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
