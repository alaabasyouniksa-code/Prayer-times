# Prayer Times & Qibla App

A React Native application built with Expo for displaying accurate prayer times and Qibla direction.

## Features

- **Automatic Location Detection**: Detects user GPS coordinates to calculate precise prayer times .
- **Accurate Calculations**: Uses the `adhan` library for reliable prayer time calculations.
- **Dashboard**:
  - Displays current prayer and countdown to the next prayer.
  - Lists Fajr, Dhuhr, Asr, Maghrib, and Isha times.
  - Shows Gregorian and Hijri dates.
- **Settings**:
  - Customize calculation method (e.g., MWL, ISNA, Makkah).
  - Adjust Asr calculation method (Standard/Shafi vs. Hanafi).

## Tech Stack

- **Framework**: React Native (Expo)
- **Routing**: Expo Router
- **Styling**: StyleSheet (Deep Midnight Blue & Gold palette)
- **Libraries**:
  - `expo-location`: GPS coordinates.
  - `adhan`: Prayer time calculations.
  - `moment` / `moment-hijri`: Date formatting.
  - `@react-native-async-storage/async-storage`: Persisting settings.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

- Run on Android:
  ```bash
  npm run android
  ```

- Run on iOS (Mac only):
  ```bash
  npm run ios
  ```

- Run on Web:
  ```bash
  npm run web
  ```

## Testing

Run the test suite with:

```bash
npm test
```
