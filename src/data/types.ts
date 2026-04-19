export type HajjTypeId = 'tamattu' | 'qiran' | 'ifrad';

export type Classification = 'FARD' | 'WAJIB' | 'SUNNAH' | 'HARAM' | 'MAKRUH';

export interface HajjType {
  id: HajjTypeId;
  name: string;
  subtitle: string;
  description: string;
  bestFor: string;
  hadyRequired: boolean;
  umrahIncluded: boolean;
  breakBetween: string;
  numberOfIhrams: number;
  endorsedBy: string;
}

export interface StepPart {
  id: string;
  title: string;
  subtitle?: string;
  steps: Step[];
}

export interface Step {
  id: string;
  stepNumber: number;
  title: string;
  shortTitle: string;
  classification: Classification;
  description: string;
  subItems?: SubItem[];
  tips?: string[];
  dayLabel?: string;
}

export interface SubItem {
  id: string;
  text: string;
  classification: Classification;
}

export interface ChecklistCategory {
  id: string;
  title: string;
  classification: Classification;
  applicableTo: HajjTypeId[];
  items: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  label: string;
  classification: Classification;
}

export interface IhramRule {
  id: string;
  text: string;
  classification: Classification;
}

export interface IhramSection {
  id: string;
  title: string;
  classification: Classification;
  description?: string;
  rules: IhramRule[];
}

export interface ProhibitedActSection {
  id: string;
  title: string;
  hajjType: HajjTypeId;
  items: string[];
}

export interface Mistake {
  id: string;
  incorrectPractice: string;
  correction: string;
}

export interface TipCategory {
  id: string;
  title: string;
  icon: string;
  tips: string[];
  hajjType?: HajjTypeId;
}

export interface KeyDate {
  id: string;
  date: string;
  dayName: string;
  keyActs: string;
  isHighlight?: boolean;
}

export interface ComparisonRow {
  feature: string;
  ifrad: string;
  qiran: string;
  tamattu: string;
}
