import { Stack } from 'expo-router';
import { SettingsProvider } from '../hooks/useSettings';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../constants/theme';

export default function Layout() {
  return (
    <SettingsProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.background },
          headerTintColor: COLORS.white,
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ title: 'Settings', presentation: 'modal' }} />
      </Stack>
    </SettingsProvider>
  );
}
