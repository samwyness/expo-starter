import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { RehydrationSlice } from './slices/rehydrationSlice';
import { createRehydrationSlice } from './slices/rehydrationSlice';

type OnboardingState = {
  hasCompletedOnboarding: boolean;
};

type OnboardingActions = {
  completeOnboarding: () => void;
  resetOnboarding: () => void;
};

type OnboardingStore = RehydrationSlice & OnboardingState & OnboardingActions;

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set, get, store) => ({
      ...createRehydrationSlice(set, get, store),

      hasCompletedOnboarding: false,

      completeOnboarding: () => {
        set((state) => {
          return {
            ...state,
            hasCompletedOnboarding: true,
          };
        });
      },

      resetOnboarding: () => {
        set((state) => {
          return {
            ...state,
            hasCompletedOnboarding: false,
          };
        });
      },
    }),
    {
      name: 'onboarding-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        hasCompletedOnboarding: state.hasCompletedOnboarding,
      }),
      onRehydrateStorage: (state) => {
        return () => state._setHasHydrated(true);
      },
    },
  ),
);
