import { ProhibitedActSection } from './types';

export const prohibitedActs: ProhibitedActSection[] = [
  {
    id: 'tamattu-donts',
    title: "Things NOT to Do (Tamattu')",
    hajjType: 'tamattu',
    items: [
      'Do NOT leave Makkah after Umrah Ihram is exited — you must complete Hajj in the same year.',
      'Do NOT re-wear Ihram garments while in the free period (between Umrah and re-entering Ihram).',
      'Do NOT delay Tawaf al-Ifadah past 12th Dhul Hijjah without a valid excuse (Dam required if delayed without excuse).',
      'Do NOT leave Arafah before sunset on 9th — this is a catastrophic error rendering Hajj invalid.',
      'Do NOT skip Muzdalifah entirely — at minimum be there part of the night.',
      'Do NOT stone Jamarat before their permitted times (after Zawal for 11th/12th/13th).',
      'Do NOT use Talbiyah after stoning Jamrat al-Aqabah on 10th Dhul Hijjah.',
      'Do NOT argue, use foul language, or fight during Hajj — this directly nullifies the spiritual reward.',
      "Do NOT combine Tamattu' with being a resident of Makkah (Dam is not required for Makkah residents).",
      "Do NOT forget the Hady sacrifice — it is WAJIB for Tamattu'.",
    ],
  },
  {
    id: 'qiran-donts',
    title: 'Things NOT to Do (Qiran)',
    hajjType: 'qiran',
    items: [
      'Do NOT exit Ihram between Umrah and Hajj — you remain in full Ihram the entire time.',
      'Do NOT shave or trim hair after the Umrah Tawaf/Sa\'i — only after Hady on 10th.',
      "Do NOT repeat Sa'i after Tawaf al-Ifadah if you already did Sa'i after Tawaf al-Qudum.",
      'Do NOT apply perfume, wear stitched clothing, or cover head at any point until released from Ihram on 10th.',
      'Do NOT forget the Hady — it is a firm WAJIB for Qiran, not optional.',
      'Do NOT enter Ihram with the combined intention AFTER starting Tawaf — the Qiran combination must be set before Tawaf.',
    ],
  },
  {
    id: 'ifrad-donts',
    title: 'Things NOT to Do (Ifrad)',
    hajjType: 'ifrad',
    items: [
      'Do NOT exit Ihram before completing Hajj — Ifrad requires maintaining Ihram from Miqat to 10th Dhul Hijjah stoning.',
      "Do NOT combine with Umrah during Hajj months before Hajj — that would make it Tamattu' or Qiran.",
      'Do NOT perform Umrah before Hajj if you\'ve already entered Ihram for Hajj only — stick to the intention.',
      'Do NOT treat the absence of Hady as meaning less care is needed — all other Wajibat still apply.',
      'Do NOT skip Tawaf al-Qudum out of laziness — it is a Sunnah that has significant reward.',
    ],
  },
];
