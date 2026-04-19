import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { HajjTypeId, HajjType, StepPart } from '../data/types';
import { hajjTypes } from '../data/hajjTypes';
import { tamattuSteps } from '../data/steps/tamattu';
import { qiranSteps } from '../data/steps/qiran';
import { ifradSteps } from '../data/steps/ifrad';
import { saveSelectedType, loadSelectedType } from '../utils/storage';

const stepsMap: Record<HajjTypeId, StepPart[]> = {
  tamattu: tamattuSteps,
  qiran: qiranSteps,
  ifrad: ifradSteps,
};

interface HajjTypeContextValue {
  selectedType: HajjTypeId | null;
  setSelectedType: (type: HajjTypeId) => Promise<void>;
  hajjTypeData: HajjType | null;
  steps: StepPart[];
  isLoading: boolean;
}

const HajjTypeContext = createContext<HajjTypeContextValue>({
  selectedType: null,
  setSelectedType: async () => {},
  hajjTypeData: null,
  steps: [],
  isLoading: true,
});

export function HajjTypeProvider({ children }: { children: React.ReactNode }) {
  const [selectedType, setType] = useState<HajjTypeId | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSelectedType().then((type) => {
      if (type) setType(type);
      setIsLoading(false);
    });
  }, []);

  const setSelectedType = useCallback(async (type: HajjTypeId) => {
    setType(type);
    await saveSelectedType(type);
  }, []);

  const hajjTypeData = selectedType
    ? hajjTypes.find((h) => h.id === selectedType) ?? null
    : null;

  const steps = selectedType ? stepsMap[selectedType] : [];

  return (
    <HajjTypeContext.Provider
      value={{ selectedType, setSelectedType, hajjTypeData, steps, isLoading }}
    >
      {children}
    </HajjTypeContext.Provider>
  );
}

export function useHajjType() {
  return useContext(HajjTypeContext);
}
