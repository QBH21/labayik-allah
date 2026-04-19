import { KeyDate } from './types';

export const keyDates: KeyDate[] = [
  {
    id: 'kd-1',
    date: '1–7 Dhul Hijjah',
    dayName: 'Pre-Hajj days',
    keyActs: "Tamattu' / Qiran: Umrah performed during this period. Ifrad: In Ihram from Miqat.",
  },
  {
    id: 'kd-2',
    date: '8 Dhul Hijjah',
    dayName: 'Yawm al-Tarwiyah',
    keyActs: "Proceed to Mina. Tamattu': Re-enter Ihram. Qiran/Ifrad: Already in Ihram.",
    isHighlight: true,
  },
  {
    id: 'kd-3',
    date: '9 Dhul Hijjah',
    dayName: 'Yawm Arafah',
    keyActs: 'WUQUF at Arafah (FARD). Combined Dhuhr+Asr. Stay until sunset. Proceed to Muzdalifah.',
    isHighlight: true,
  },
  {
    id: 'kd-4',
    date: 'Night 9th–10th',
    dayName: 'Muzdalifah Night',
    keyActs: 'Pray Maghrib+Isha (combined). Collect pebbles. Sleep. Fajr at Muzdalifah.',
    isHighlight: true,
  },
  {
    id: 'kd-5',
    date: '10 Dhul Hijjah',
    dayName: 'Yawm al-Nahr (Eid ul-Adha)',
    keyActs: "Stone Jamrat al-Aqabah. Sacrifice (Tamattu'/Qiran). Halaq/Qasr. Tawaf al-Ifadah. Sa'i.",
    isHighlight: true,
  },
  {
    id: 'kd-6',
    date: '11 Dhul Hijjah',
    dayName: 'First Tashriq Day',
    keyActs: 'Stone all 3 Jamarat after Zawal. Night in Mina.',
    isHighlight: true,
  },
  {
    id: 'kd-7',
    date: '12 Dhul Hijjah',
    dayName: 'Second Tashriq Day',
    keyActs: 'Stone all 3 Jamarat after Zawal. May depart (Nafar Awwal) before sunset.',
    isHighlight: true,
  },
  {
    id: 'kd-8',
    date: '13 Dhul Hijjah',
    dayName: 'Third Tashriq Day',
    keyActs: 'Only if stayed past sunset of 12th: stone all 3 Jamarat. Final departure.',
  },
  {
    id: 'kd-9',
    date: 'Before leaving Makkah',
    dayName: "Tawaf al-Wada'",
    keyActs: 'Final 7 circuits. Last act before departure.',
    isHighlight: true,
  },
];
