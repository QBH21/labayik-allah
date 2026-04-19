import { HajjType } from './types';

export const hajjTypes: HajjType[] = [
  {
    id: 'tamattu',
    name: "Hajj Tamattu'",
    subtitle: 'Enjoyment (two Ihrams)',
    description:
      "Tamattu' means 'enjoyment/benefit' — the pilgrim benefits from being released from Ihram between Umrah and Hajj. This is the type the Prophet (peace be upon him) encouraged his Companions to perform during the Farewell Hajj. A Hady (sacrifice) is mandatory.",
    bestFor: 'International pilgrims (most common)',
    hadyRequired: true,
    umrahIncluded: true,
    breakBetween: 'Yes — rest allowed',
    numberOfIhrams: 2,
    endorsedBy: 'Hanbali (highest rank)',
  },
  {
    id: 'qiran',
    name: 'Hajj Qiran',
    subtitle: 'Combined (one Ihram)',
    description:
      "Qiran means 'joining' — both Hajj and Umrah are combined in a single Ihram. The pilgrim does NOT exit Ihram between Umrah and Hajj. This is considered the most virtuous by the Hanafi madhab. A Hady is mandatory. Physically demanding as Ihram restrictions apply throughout the stay.",
    bestFor: 'Those arriving close to Hajj days',
    hadyRequired: true,
    umrahIncluded: true,
    breakBetween: 'No break',
    numberOfIhrams: 1,
    endorsedBy: 'Hanafi (highest rank)',
  },
  {
    id: 'ifrad',
    name: 'Hajj Ifrad',
    subtitle: 'Isolated / Hajj only',
    description:
      "Ifrad means 'isolation/single' — the pilgrim performs Hajj alone, without combining it with Umrah. No Hady is required (though voluntary). This is the simplest in terms of what is obligatory. Preferred by Maliki and Shafi'i schools. Umrah may be performed separately after Hajj.",
    bestFor: 'Makkah residents / locals',
    hadyRequired: false,
    umrahIncluded: false,
    breakBetween: 'N/A',
    numberOfIhrams: 1,
    endorsedBy: 'Maliki / Shafi\'i',
  },
];
