import { IhramSection } from './types';

export const ihramSections: IhramSection[] = [
  {
    id: 'enter-ihram',
    title: 'How to Enter Ihram (Hanafi/Hanbali — most practical)',
    classification: 'FARD',
    rules: [
      { id: 'ei-1', text: 'Perform Ghusl (full bath) — even for menstruating women as preparation.', classification: 'FARD' },
      { id: 'ei-2', text: 'Men: Wear two unstitched white cloths (izar/waist-wrap and rida/shoulder-wrap). Women: Normal modest clothing, face must remain uncovered.', classification: 'FARD' },
      { id: 'ei-3', text: "Apply perfume to body (NOT to ihram garments) — only BEFORE niyyah (Imam Shafi'i, Hanbali allow this).", classification: 'SUNNAH' },
      { id: 'ei-4', text: "Offer 2 raka'at nafl prayer (Sunnah — do not perform if it is a makruh time).", classification: 'SUNNAH' },
      { id: 'ei-5', text: 'Make Niyyah (intention) for your specific type of Hajj.', classification: 'FARD' },
      { id: 'ei-6', text: "Recite Talbiyah: 'Labbayk Allahumma Labbayk. Labbayka La Sharika Laka Labbayk. Innal Hamda wan Ni'mata Laka wal Mulk. La Sharika Lak.' — Say it aloud (men), quietly (women).", classification: 'WAJIB' },
      { id: 'ei-7', text: 'Ihram begins the moment Talbiyah is recited with intention.', classification: 'FARD' },
    ],
  },
  {
    id: 'prohibited',
    title: 'Prohibited in Ihram (All Scholars Agree)',
    classification: 'HARAM',
    description: 'Dam (penalty) quick rule: Violating any of the below intentionally requires a Dam (sacrificing a sheep/goat or equivalent). If done by mistake/forgetfulness with no animal available, the easiest position (Maliki/Hanbali) is that a fidyah of feeding 6 poor persons or fasting 3 days may suffice. Always consult a scholar if an Ihram violation occurs.',
    rules: [
      { id: 'pi-1', text: 'Sexual intercourse or any act leading toward it.', classification: 'HARAM' },
      { id: 'pi-2', text: 'Using perfume or scented products on body or clothing after entering Ihram.', classification: 'HARAM' },
      { id: 'pi-3', text: 'Cutting, trimming, or shaving any hair (head, body).', classification: 'HARAM' },
      { id: 'pi-4', text: 'Clipping nails (hands or feet).', classification: 'HARAM' },
      { id: 'pi-5', text: 'Men: Wearing stitched/fitted clothing, covering the head, wearing shoes that cover the ankle.', classification: 'HARAM' },
      { id: 'pi-6', text: 'Women: Covering the face with niqab or gloves (hands must remain uncovered — Hanafi position, which is the easiest).', classification: 'HARAM' },
      { id: 'pi-7', text: 'Hunting land animals or pointing/helping to hunt them.', classification: 'HARAM' },
      { id: 'pi-8', text: 'Fighting, arguing, or using obscene language.', classification: 'HARAM' },
      { id: 'pi-9', text: 'Uprooting vegetation within the Haram boundary.', classification: 'HARAM' },
      { id: 'pi-10', text: 'Killing insects unless posing direct harm to person.', classification: 'HARAM' },
    ],
  },
];
