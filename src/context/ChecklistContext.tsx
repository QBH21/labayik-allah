import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { ChecklistState, saveChecklistState, loadChecklistState, saveCompletedSteps, loadCompletedSteps } from '../utils/storage';
import { checklistData } from '../data/checklist';
import { HajjTypeId } from '../data/types';

interface ChecklistContextValue {
  checklistState: ChecklistState;
  completedSteps: string[];
  toggleItem: (itemId: string) => void;
  updateNotes: (itemId: string, notes: string) => void;
  toggleStep: (stepId: string) => void;
  isStepCompleted: (stepId: string) => boolean;
  isItemChecked: (itemId: string) => boolean;
  getItemNotes: (itemId: string) => string;
  getProgress: (hajjType: HajjTypeId) => { fardDone: number; fardTotal: number; wajibDone: number; wajibTotal: number; totalDone: number; totalTotal: number };
  resetAll: () => void;
  isLoading: boolean;
}

const ChecklistContext = createContext<ChecklistContextValue>({
  checklistState: {},
  completedSteps: [],
  toggleItem: () => {},
  updateNotes: () => {},
  toggleStep: () => {},
  isStepCompleted: () => false,
  isItemChecked: () => false,
  getItemNotes: () => '',
  getProgress: () => ({ fardDone: 0, fardTotal: 0, wajibDone: 0, wajibTotal: 0, totalDone: 0, totalTotal: 0 }),
  resetAll: () => {},
  isLoading: true,
});

export function ChecklistProvider({ children }: { children: React.ReactNode }) {
  const [checklistState, setChecklistState] = useState<ChecklistState>({});
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const saveTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    Promise.all([loadChecklistState(), loadCompletedSteps()]).then(([cl, cs]) => {
      setChecklistState(cl);
      setCompletedSteps(cs);
      setIsLoading(false);
    });
  }, []);

  const debouncedSaveChecklist = useCallback((state: ChecklistState) => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => saveChecklistState(state), 300);
  }, []);

  const toggleItem = useCallback((itemId: string) => {
    setChecklistState((prev) => {
      const current = prev[itemId] ?? { isChecked: false, notes: '' };
      const next = { ...prev, [itemId]: { ...current, isChecked: !current.isChecked } };
      debouncedSaveChecklist(next);
      return next;
    });
  }, [debouncedSaveChecklist]);

  const updateNotes = useCallback((itemId: string, notes: string) => {
    setChecklistState((prev) => {
      const current = prev[itemId] ?? { isChecked: false, notes: '' };
      const next = { ...prev, [itemId]: { ...current, notes } };
      debouncedSaveChecklist(next);
      return next;
    });
  }, [debouncedSaveChecklist]);

  const toggleStep = useCallback((stepId: string) => {
    setCompletedSteps((prev) => {
      const next = prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId];
      saveCompletedSteps(next);
      return next;
    });
  }, []);

  const isStepCompleted = useCallback((stepId: string) => completedSteps.includes(stepId), [completedSteps]);

  const isItemChecked = useCallback((itemId: string) => checklistState[itemId]?.isChecked ?? false, [checklistState]);

  const getItemNotes = useCallback((itemId: string) => checklistState[itemId]?.notes ?? '', [checklistState]);

  const getProgress = useCallback((hajjType: HajjTypeId) => {
    const applicable = checklistData.filter((cat) => cat.applicableTo.includes(hajjType));
    let fardDone = 0, fardTotal = 0, wajibDone = 0, wajibTotal = 0;

    for (const cat of applicable) {
      for (const item of cat.items) {
        if (item.classification === 'FARD') {
          fardTotal++;
          if (checklistState[item.id]?.isChecked) fardDone++;
        } else if (item.classification === 'WAJIB') {
          wajibTotal++;
          if (checklistState[item.id]?.isChecked) wajibDone++;
        }
      }
    }

    return {
      fardDone,
      fardTotal,
      wajibDone,
      wajibTotal,
      totalDone: fardDone + wajibDone,
      totalTotal: fardTotal + wajibTotal,
    };
  }, [checklistState]);

  const resetAll = useCallback(() => {
    setChecklistState({});
    setCompletedSteps([]);
    saveChecklistState({});
    saveCompletedSteps([]);
  }, []);

  return (
    <ChecklistContext.Provider
      value={{
        checklistState,
        completedSteps,
        toggleItem,
        updateNotes,
        toggleStep,
        isStepCompleted,
        isItemChecked,
        getItemNotes,
        getProgress,
        resetAll,
        isLoading,
      }}
    >
      {children}
    </ChecklistContext.Provider>
  );
}

export function useChecklist() {
  return useContext(ChecklistContext);
}
