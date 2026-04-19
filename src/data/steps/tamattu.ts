import { StepPart } from '../types';

export const tamattuSteps: StepPart[] = [
  {
    id: 'tamattu-umrah',
    title: 'PART 1 — UMRAH',
    subtitle: 'Dhul Hijjah 1–7, before Hajj begins',
    steps: [
      {
        id: 'tamattu-u1',
        stepNumber: 1,
        title: 'Enter Ihram at Miqat',
        shortTitle: 'Ihram',
        classification: 'FARD',
        description:
          "Make Ghusl, wear Ihram garments, pray 2 raka'at, recite Niyyah for Umrah: 'Allahumma inni uridu al-Umrata fa yassirha li.' Begin Talbiyah.",
      },
      {
        id: 'tamattu-u2',
        stepNumber: 2,
        title: 'Tawaf al-Umrah',
        shortTitle: 'Tawaf',
        classification: 'FARD',
        description:
          "Enter Masjid al-Haram right foot first with du'a. Begin Tawaf at Hajar Aswad (Black Stone) — face it, say Takbir, and begin circling. Men: expose right shoulder (Idtiba) during all 7 circuits. Men: walk briskly (Raml) during first 3 circuits.",
      },
      {
        id: 'tamattu-u3',
        stepNumber: 3,
        title: 'Touch or Salute Hajar Aswad',
        shortTitle: 'Hajar Aswad',
        classification: 'SUNNAH',
        description:
          "At each passing: touch & kiss if possible; if crowded, raise right hand toward it and say 'Bismillah, Allahu Akbar.' Touch Rukn Yamani with right hand each round (don't kiss it — just touch). Say between Rukn Yamani and Hajar Aswad: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina adhaban-nar.'",
      },
      {
        id: 'tamattu-u4',
        stepNumber: 4,
        title: "2 Raka'at behind Maqam Ibrahim",
        shortTitle: "2 Raka'at",
        classification: 'SUNNAH',
        description:
          "After completing 7 circuits. Recite Surah al-Kafirun in 1st raka'ah, Surah al-Ikhlas in 2nd. If not possible to stand there, pray anywhere in the mosque.",
      },
      {
        id: 'tamattu-u5',
        stepNumber: 5,
        title: 'Zamzam Water',
        shortTitle: 'Zamzam',
        classification: 'SUNNAH',
        description:
          "Drink Zamzam water facing Qibla with du'a. Sunnah — but very highly recommended.",
      },
      {
        id: 'tamattu-u6',
        stepNumber: 6,
        title: "Sa'i between Safa and Marwah",
        shortTitle: "Sa'i",
        classification: 'WAJIB',
        description:
          "Walk from Safa to Marwah (1 lap). Do this 7 times (ends at Marwah). Men: jog/run between the two green-lit markers. Ascend Safa at the start, face Ka'bah, raise hands, recite Takbir & Tahlil, make du'a. Repeat at Marwah.",
      },
      {
        id: 'tamattu-u7',
        stepNumber: 7,
        title: 'Halaq or Qasr — EXIT IHRAM',
        shortTitle: 'Halaq/Qasr',
        classification: 'WAJIB',
        description:
          'Men: Shave entire head (Halaq) OR trim from all over (Qasr — finger length minimum). Women: Trim a fingertip-length from end of hair. NOW YOU EXIT IHRAM. All restrictions lifted. Wear normal clothes.',
      },
    ],
  },
  {
    id: 'tamattu-hajj',
    title: 'PART 2 — HAJJ',
    subtitle: '8th Dhul Hijjah onward',
    steps: [
      {
        id: 'tamattu-h1',
        stepNumber: 1,
        title: '8th Dhul Hijjah — Enter Ihram & Depart for Mina',
        shortTitle: '8th DH — Mina',
        classification: 'SUNNAH',
        dayLabel: '8 Dhul Hijjah',
        description:
          "Re-enter Ihram from Makkah with Hajj intention: 'Allahumma inni uridu al-Hajja fa yassirhu li.' Proceed to Mina after Fajr or by evening of 7th. Spend the night of 8th in Mina. Pray Dhuhr, Asr, Maghrib, Isha, and Fajr of 9th in Mina (each prayer at its own time — Qasr but NOT combining, per Sunnah in Mina).",
      },
      {
        id: 'tamattu-h2',
        stepNumber: 2,
        title: '9th Dhul Hijjah — Wuquf at Arafah (THE HEART OF HAJJ)',
        shortTitle: '9th DH — Arafah',
        classification: 'FARD',
        dayLabel: '9 Dhul Hijjah',
        description:
          "Depart Mina after Fajr. Arrive at Arafah before Zawal (noon). Pray Dhuhr and Asr combined (Qasr: 2+2 raka'at) at time of Dhuhr. REMAIN at Arafah until AFTER sunset — this is a FARD. Make abundant du'a, dhikr, istighfar, recite Quran. Do NOT leave before sunset. After sunset: depart calmly for Muzdalifah. Do NOT pray Maghrib at Arafah.",
      },
      {
        id: 'tamattu-h3',
        stepNumber: 3,
        title: 'Night of 9th–10th — Muzdalifah',
        shortTitle: 'Muzdalifah',
        classification: 'WAJIB',
        dayLabel: 'Night 9th–10th',
        description:
          "Arrive at Muzdalifah. Pray Maghrib and Isha combined (Isha time, Qasr: 3+2). Spend the night. Collect 49 or 70 pebbles (size of a small chickpea) for Rami. Pray Fajr of 10th at Muzdalifah. Make du'a facing Qibla. Depart after Fajr (the weak and women may leave after midnight — easier Hanbali position).",
      },
      {
        id: 'tamattu-h4',
        stepNumber: 4,
        title: '10th Dhul Hijjah — Yawm al-Nahr (Day of Sacrifice)',
        shortTitle: '10th DH — Sacrifice',
        classification: 'WAJIB',
        dayLabel: '10 Dhul Hijjah',
        description:
          "Arrive in Mina. Do all four of the following (Sunnah order): 1. Rami — Stone Jamrat al-Aqabah ONLY with 7 pebbles (say 'Bismillah, Allahu Akbar' each throw). Stop Talbiyah after this. 2. Hady — Sacrifice your animal (or confirm it has been done via voucher). Cannot eat until after sacrifice. 3. Halaq or Qasr — Shave or trim hair. Exit partial Ihram (now permitted: all except intercourse & perfume). 4. Tawaf al-Ifadah — Go to Masjid al-Haram and perform Tawaf (7 circuits). No Idtiba or Raml this time. 5. Sa'i — 7 laps Safa-Marwah (if you did not do Sa'i after Tawaf al-Qudum, do it now). After Sa'i: Full exit from Ihram. Return to Mina for the night.",
      },
      {
        id: 'tamattu-h5',
        stepNumber: 5,
        title: '11th Dhul Hijjah — Tashriq Day 1',
        shortTitle: '11th DH — Rami',
        classification: 'WAJIB',
        dayLabel: '11 Dhul Hijjah',
        description:
          "Stone all three Jamarat after Zawal (after midday) — in order: Jamrat al-Ula (small), Jamrat al-Wusta (middle), Jamrat al-Aqabah (large). 7 pebbles each, Takbir with each throw. Make du'a after Ula and Wusta (face Qibla, raise hands). Spend night in Mina.",
      },
      {
        id: 'tamattu-h6',
        stepNumber: 6,
        title: '12th Dhul Hijjah — Tashriq Day 2 (Nafar Awwal)',
        shortTitle: '12th DH — Rami',
        classification: 'WAJIB',
        dayLabel: '12 Dhul Hijjah',
        description:
          'Stone all three Jamarat again after Zawal — same order and method. Option to leave after stoning before sunset (Nafar Awwal — early departure, permitted by Quran 2:203). If you stay past sunset, you must also stone on 13th.',
      },
      {
        id: 'tamattu-h7',
        stepNumber: 7,
        title: '13th Dhul Hijjah — Tashriq Day 3 (Optional, but preferable)',
        shortTitle: '13th DH — Rami',
        classification: 'SUNNAH',
        dayLabel: '13 Dhul Hijjah',
        description:
          'Stone all three Jamarat after Zawal (only if you remained past sunset of 12th, or voluntarily chose to stay). Then depart Mina. Return to Makkah.',
      },
      {
        id: 'tamattu-h8',
        stepNumber: 8,
        title: "Tawaf al-Wada' — Final Farewell",
        shortTitle: "Tawaf al-Wada'",
        classification: 'WAJIB',
        description:
          "Before leaving Makkah, perform Tawaf al-Wada' (7 circuits). No Sa'i after this. No Idtiba or Raml. This should be the LAST thing done before departing. Women in menses are excused from this Tawaf.",
      },
    ],
  },
];
