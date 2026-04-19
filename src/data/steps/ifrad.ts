import { StepPart } from '../types';

export const ifradSteps: StepPart[] = [
  {
    id: 'ifrad-main',
    title: 'HAJJ IFRAD',
    subtitle: 'Perform Hajj ONLY — no Umrah included',
    steps: [
      {
        id: 'ifrad-1',
        stepNumber: 1,
        title: 'Enter Ihram at Miqat (or from Makkah if resident)',
        shortTitle: 'Ihram',
        classification: 'FARD',
        description:
          "Ghusl, garments, 2 raka'at, intention: 'Allahumma inni uridu al-Hajja fa yassirhu li.' Begin Talbiyah loudly (men) or quietly (women).",
      },
      {
        id: 'ifrad-2',
        stepNumber: 2,
        title: 'Tawaf al-Qudum (Sunnah — Arrival Tawaf)',
        shortTitle: 'Tawaf al-Qudum',
        classification: 'SUNNAH',
        description:
          "Upon arriving in Makkah, perform 7 circuits with Idtiba and Raml (first 3, for men). Pray 2 raka'at behind Maqam Ibrahim. Drink Zamzam.",
      },
      {
        id: 'ifrad-3',
        stepNumber: 3,
        title: "Sa'i of Hajj (may be done now or after Tawaf al-Ifadah)",
        shortTitle: "Sa'i",
        classification: 'FARD',
        description:
          "7 laps Safa–Marwah. It is preferable to do Sa'i now (Hanbali/Hanafi position — easier). If done now, no second Sa'i is needed after Tawaf al-Ifadah.",
      },
      {
        id: 'ifrad-4',
        stepNumber: 4,
        title: 'Remain in Makkah in Ihram until 8 Dhul Hijjah',
        shortTitle: 'Remain in Ihram',
        classification: 'FARD',
        description:
          'DO NOT exit Ihram. Pray, make dhikr, read Quran, stay in state of Ihram.',
      },
      {
        id: 'ifrad-5',
        stepNumber: 5,
        title: '8th Dhul Hijjah — Depart for Mina',
        shortTitle: '8th DH — Mina',
        classification: 'SUNNAH',
        dayLabel: '8 Dhul Hijjah',
        description:
          'Proceed to Mina after Fajr (or evening of 7th). Pray 5 prayers in Mina. Spend the night.',
      },
      {
        id: 'ifrad-6',
        stepNumber: 6,
        title: '9th Dhul Hijjah — Wuquf at Arafah',
        shortTitle: '9th DH — Arafah',
        classification: 'FARD',
        dayLabel: '9 Dhul Hijjah',
        description:
          "Same as Tamattu' — critical FARD. Combined Dhuhr+Asr. Remain until after sunset. Abundant du'a. Depart to Muzdalifah after sunset.",
      },
      {
        id: 'ifrad-7',
        stepNumber: 7,
        title: 'Night 9th–10th — Muzdalifah',
        shortTitle: 'Muzdalifah',
        classification: 'WAJIB',
        dayLabel: 'Night 9th–10th',
        description:
          'Combined Maghrib+Isha at Isha time. Sleep. Collect pebbles. Fajr prayer. Depart after Fajr.',
      },
      {
        id: 'ifrad-8',
        stepNumber: 8,
        title: '10th Dhul Hijjah — Yawm al-Nahr',
        shortTitle: '10th DH — Sacrifice Day',
        classification: 'WAJIB',
        dayLabel: '10 Dhul Hijjah',
        description:
          "1. Rami — Stone Jamrat al-Aqabah (7 pebbles). STOP Talbiyah. 2. Halaq or Qasr (no Hady is required for Ifrad — exit Ihram directly). 3. Tawaf al-Ifadah (7 circuits, no Idtiba/Raml). 4. Sa'i (only if not done after Tawaf al-Qudum). Return to Mina.",
      },
      {
        id: 'ifrad-9',
        stepNumber: 9,
        title: '11th & 12th Dhul Hijjah — Rami Tashriq',
        shortTitle: '11th/12th DH — Rami',
        classification: 'WAJIB',
        dayLabel: '11–12 Dhul Hijjah',
        description:
          "Stone all three Jamarat in order (Ula, Wusta, Aqabah) after Zawal. Du'a after first two. May depart after 12th before sunset.",
      },
      {
        id: 'ifrad-10',
        stepNumber: 10,
        title: "Tawaf al-Wada'",
        shortTitle: "Tawaf al-Wada'",
        classification: 'WAJIB',
        description:
          "Last Tawaf before leaving Makkah (7 circuits). No Sa'i. Women in menses excused.",
      },
      {
        id: 'ifrad-11',
        stepNumber: 11,
        title: "Optional: Umrah after Hajj (Shafi'i position)",
        shortTitle: 'Optional Umrah',
        classification: 'SUNNAH',
        description:
          "If you wish to perform Umrah, exit Makkah to Tan'im or any Hill boundary, enter Ihram for Umrah, and perform Umrah. This is optional and does NOT affect the Hajj validity.",
      },
    ],
  },
];
