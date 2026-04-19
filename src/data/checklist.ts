import { ChecklistCategory } from './types';

export const checklistData: ChecklistCategory[] = [
  {
    id: 'umrah-fard',
    title: 'UMRAH — Fard Acts',
    classification: 'FARD',
    applicableTo: ['tamattu', 'qiran'],
    items: [
      {
        id: 'uf-1',
        label: 'Ihram entered at Miqat with correct Niyyah for Umrah',
        classification: 'FARD',
      },
      {
        id: 'uf-2',
        label: 'Tawaf al-Umrah — 7 circuits completed, counter-clockwise',
        classification: 'FARD',
      },
    ],
  },
  {
    id: 'umrah-wajib',
    title: 'UMRAH — Wajib Acts',
    classification: 'WAJIB',
    applicableTo: ['tamattu', 'qiran'],
    items: [
      {
        id: 'uw-1',
        label: "Sa'i — 7 laps Safa to Marwah completed",
        classification: 'WAJIB',
      },
      {
        id: 'uw-2',
        label: "Halaq or Qasr performed (Tamattu': then exited Ihram)",
        classification: 'WAJIB',
      },
    ],
  },
  {
    id: 'hajj-fard',
    title: 'HAJJ — Fard Acts (Hajj INVALID if missed)',
    classification: 'FARD',
    applicableTo: ['tamattu', 'qiran', 'ifrad'],
    items: [
      {
        id: 'hf-1',
        label: 'Ihram entered for Hajj with correct Niyyah',
        classification: 'FARD',
      },
      {
        id: 'hf-2',
        label: 'Arrived at Arafah on 9th Dhul Hijjah',
        classification: 'FARD',
      },
      {
        id: 'hf-3',
        label: 'Remained at Arafah past sunset on 9th',
        classification: 'FARD',
      },
      {
        id: 'hf-4',
        label: 'Tawaf al-Ifadah (7 circuits) performed after 10th morning',
        classification: 'FARD',
      },
      {
        id: 'hf-5',
        label: "Sa'i of Hajj performed (if not done after Tawaf al-Qudum)",
        classification: 'FARD',
      },
    ],
  },
  {
    id: 'hajj-wajib',
    title: 'HAJJ — Wajib Acts (Dam required if missed)',
    classification: 'WAJIB',
    applicableTo: ['tamattu', 'qiran', 'ifrad'],
    items: [
      {
        id: 'hw-1',
        label: 'Wuquf at Muzdalifah — spent part of night',
        classification: 'WAJIB',
      },
      {
        id: 'hw-2',
        label: 'Pebbles collected (49 minimum)',
        classification: 'WAJIB',
      },
      {
        id: 'hw-3',
        label: 'Rami — Jamrat al-Aqabah stoned on 10th (7 pebbles)',
        classification: 'WAJIB',
      },
      {
        id: 'hw-4',
        label: "Hady sacrificed on 10th (Tamattu' & Qiran ONLY — MANDATORY)",
        classification: 'WAJIB',
      },
      {
        id: 'hw-5',
        label: 'Halaq or Qasr performed after sacrifice on 10th',
        classification: 'WAJIB',
      },
      {
        id: 'hw-6',
        label: 'Rami — All three Jamarat on 11th Dhul Hijjah',
        classification: 'WAJIB',
      },
      {
        id: 'hw-7',
        label: 'Rami — All three Jamarat on 12th Dhul Hijjah',
        classification: 'WAJIB',
      },
      {
        id: 'hw-8',
        label: 'Rami — All three Jamarat on 13th (if stayed past sunset of 12th)',
        classification: 'WAJIB',
      },
      {
        id: 'hw-9',
        label: 'Spent night of 11th in Mina',
        classification: 'WAJIB',
      },
      {
        id: 'hw-10',
        label: 'Spent night of 12th in Mina (if not departed by sunset)',
        classification: 'WAJIB',
      },
      {
        id: 'hw-11',
        label: "Tawaf al-Wada' performed before departure",
        classification: 'WAJIB',
      },
    ],
  },
];
