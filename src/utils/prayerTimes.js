import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from 'adhan';
import moment from 'moment';
import 'moment-hijri';

export const calculatePrayerTimes = (latitude, longitude, calculationMethod, asrMethod) => {
  const coordinates = new Coordinates(latitude, longitude);
  const date = new Date();

  // Default to Muslim World League if not provided
  let params = CalculationMethod.MuslimWorldLeague();

  // Mapping logic for calculation methods
  switch (calculationMethod) {
    case 'MWL':
      params = CalculationMethod.MuslimWorldLeague();
      break;
    case 'ISNA':
      params = CalculationMethod.NorthAmerica();
      break;
    case 'Egypt':
      params = CalculationMethod.Egyptian();
      break;
    case 'Makkah':
      params = CalculationMethod.UmmAlQura();
      break;
    case 'Karachi':
      params = CalculationMethod.Karachi();
      break;
    case 'Tehran':
      params = CalculationMethod.Tehran();
      break;
    default:
      params = CalculationMethod.MuslimWorldLeague();
  }

  // Set Asr Method (Standard/Shafi or Hanafi)
  if (asrMethod === 'Hanafi') {
    params.madhab = Madhab.Hanafi;
  } else {
    params.madhab = Madhab.Shafi;
  }

  const prayerTimes = new PrayerTimes(coordinates, date, params);

  return {
    fajr: prayerTimes.fajr,
    sunrise: prayerTimes.sunrise,
    dhuhr: prayerTimes.dhuhr,
    asr: prayerTimes.asr,
    maghrib: prayerTimes.maghrib,
    isha: prayerTimes.isha,
  };
};

export const getNextPrayer = (prayerTimes) => {
    const now = new Date();
    const times = [
        { name: 'Fajr', time: prayerTimes.fajr },
        { name: 'Sunrise', time: prayerTimes.sunrise }, // Often not considered a prayer for next prayer logic, but useful to know
        { name: 'Dhuhr', time: prayerTimes.dhuhr },
        { name: 'Asr', time: prayerTimes.asr },
        { name: 'Maghrib', time: prayerTimes.maghrib },
        { name: 'Isha', time: prayerTimes.isha },
    ];

    // Find the first time that is after now
    for (const p of times) {
        if (p.time > now) {
            return p;
        }
    }

    // If all passed, next is Fajr tomorrow
    return { name: 'Fajr', time: new Date(prayerTimes.fajr.getTime() + 24 * 60 * 60 * 1000) };
};

export const formatTime = (date) => {
  return moment(date).locale('en').format('h:mm A');
};

export const getGregorianDate = () => {
  return moment().format('dddd, D MMMM YYYY');
};

export const getHijriDate = () => {
  return moment().format('iD iMMMM iYYYY');
};
