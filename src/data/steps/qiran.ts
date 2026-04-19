import { StepPart } from '../types';

export const qiranSteps: StepPart[] = [
  {
    id: 'qiran-main',
    title: 'HAJJ QIRAN',
    subtitle: 'Perform Umrah and Hajj in ONE unbroken Ihram',
    steps: [
      {
        id: 'qiran-1',
        stepNumber: 1,
        title: 'Enter Ihram at Miqat',
        shortTitle: 'Ihram',
        classification: 'FARD',
        description:
          "Ghusl, garments, 2 raka'at, intention: 'Allahumma inni uridu al-Hajja wal-Umrata fa yassirhumalii.' OR first intend Umrah, then add Hajj intention before beginning Tawaf. Begin Talbiyah.",
      },
      {
        id: 'qiran-2',
        stepNumber: 2,
        title: 'Tawaf al-Qudum (Arrival Tawaf)',
        shortTitle: 'Tawaf al-Qudum',
        classification: 'WAJIB',
        description:
          "Perform 7 circuits with Idtiba (exposed right shoulder) and Raml (brisk walk, first 3 circuits for men). Touch/salute Hajar Aswad at start. Touch Rukn Yamani each round. Pray 2 raka'at behind Maqam Ibrahim.",
      },
      {
        id: 'qiran-3',
        stepNumber: 3,
        title: "Sa'i of Umrah (combined with Hajj)",
        shortTitle: "Sa'i",
        classification: 'FARD',
        description:
          "After Tawaf al-Qudum, perform Sa'i (7 laps Safa–Marwah). This Sa'i counts for BOTH Umrah and Hajj — no second Sa'i needed after Tawaf al-Ifadah. Do NOT shave or trim hair. Remain in Ihram.",
      },
      {
        id: 'qiran-4',
        stepNumber: 4,
        title: '8th Dhul Hijjah — Proceed to Mina',
        shortTitle: '8th DH — Mina',
        classification: 'SUNNAH',
        dayLabel: '8 Dhul Hijjah',
        description:
          'Spend night in Mina. Pray all 5 prayers. Recite Talbiyah abundantly.',
      },
      {
        id: 'qiran-5',
        stepNumber: 5,
        title: '9th Dhul Hijjah — Wuquf at Arafah',
        shortTitle: '9th DH — Arafah',
        classification: 'FARD',
        dayLabel: '9 Dhul Hijjah',
        description:
          "Same as Tamattu' — combined Dhuhr+Asr, remain until after sunset, abundant du'a and dhikr. Depart to Muzdalifah after sunset.",
      },
      {
        id: 'qiran-6',
        stepNumber: 6,
        title: 'Night 9th–10th — Muzdalifah',
        shortTitle: 'Muzdalifah',
        classification: 'WAJIB',
        dayLabel: 'Night 9th–10th',
        description:
          'Combined Maghrib+Isha, sleep, Fajr, collect pebbles. Depart after Fajr (weak may leave after midnight).',
      },
      {
        id: 'qiran-7',
        stepNumber: 7,
        title: '10th Dhul Hijjah — Yawm al-Nahr',
        shortTitle: '10th DH — Sacrifice',
        classification: 'WAJIB',
        dayLabel: '10 Dhul Hijjah',
        description:
          "1. Rami — Stone Jamrat al-Aqabah with 7 pebbles. STOP Talbiyah. 2. Hady — Sacrifice (MANDATORY for Qiran). 3. Halaq or Qasr. 4. Tawaf al-Ifadah (7 circuits — NO Idtiba or Raml this time). Note: Sa'i is NOT required again if done after Tawaf al-Qudum. Return to Mina.",
      },
      {
        id: 'qiran-8',
        stepNumber: 8,
        title: '11th & 12th Dhul Hijjah — Rami Tashriq',
        shortTitle: '11th/12th DH — Rami',
        classification: 'WAJIB',
        dayLabel: '11–12 Dhul Hijjah',
        description:
          "Stone all three Jamarat (in order: Ula, Wusta, Aqabah) after Zawal each day. Make du'a after first two. Option to depart on 12th before sunset (Nafar Awwal).",
      },
      {
        id: 'qiran-9',
        stepNumber: 9,
        title: "Tawaf al-Wada'",
        shortTitle: "Tawaf al-Wada'",
        classification: 'WAJIB',
        description:
          "Last act before leaving Makkah. 7 circuits. No Sa'i.",
      },
    ],
  },
];
