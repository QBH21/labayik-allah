import { ComparisonRow } from './types';

export const comparisonData: ComparisonRow[] = [
  {
    feature: 'Meaning',
    ifrad: 'Isolated / Hajj only',
    qiran: 'Combined (one Ihram)',
    tamattu: 'Enjoyment (two Ihrams)',
  },
  {
    feature: 'Umrah included?',
    ifrad: 'No (or after)',
    qiran: 'Yes (same Ihram)',
    tamattu: 'Yes (separate Ihram)',
  },
  {
    feature: 'Break between Umrah & Hajj?',
    ifrad: 'N/A',
    qiran: 'No break',
    tamattu: 'Yes — rest allowed',
  },
  {
    feature: 'Number of Ihrams',
    ifrad: '1',
    qiran: '1',
    tamattu: '2',
  },
  {
    feature: 'Hady (sacrifice) required?',
    ifrad: 'NO',
    qiran: 'YES',
    tamattu: 'YES',
  },
  {
    feature: 'Best for whom?',
    ifrad: 'Makkah residents / locals',
    qiran: 'Those arriving close to Hajj days',
    tamattu: 'International pilgrims (most common)',
  },
  {
    feature: 'Tawaf al-Qudum (arrival)?',
    ifrad: 'Sunnah',
    qiran: 'Sunnah',
    tamattu: 'Not applicable',
  },
  {
    feature: 'Endorsed by which Imam?',
    ifrad: "Maliki / Shafi'i",
    qiran: 'Hanafi (highest rank)',
    tamattu: 'Hanbali (highest rank)',
  },
];
