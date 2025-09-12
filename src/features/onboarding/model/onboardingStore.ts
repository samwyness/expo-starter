import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { RehydrationSlice } from '#/shared/stores/slices/rehydrationSlice';
import { createRehydrationSlice } from '#/shared/stores/slices/rehydrationSlice';

type OnboardingState = {
  hasCompletedOnboarding: boolean;
};

type OnboardingActions = {
  completeOnboarding: () => void;
  resetOnboarding: () => void;
};

type OnboardingStore = (RehydrationSlice & OnboardingState) & {
  actions: OnboardingActions;
};

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set, get, store) => ({
      ...createRehydrationSlice(set, get, store),

      hasCompletedOnboarding: false,

      actions: {
        completeOnboarding: () => {
          set({ hasCompletedOnboarding: true });
        },

        resetOnboarding: () => {
          set({ hasCompletedOnboarding: false });
        },
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

export const useOnboardingActions = () =>
  useOnboardingStore((state) => state.actions);
