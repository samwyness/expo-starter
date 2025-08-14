import type { StateCreator } from 'zustand';

export type RehydrationSlice = {
  /**
   * Indicates whether the store has been hydrated from persistent storage.
   */
  _hasHydrated: boolean;

  /**
   * Sets the hydration status of the store.
   */
  _setHasHydrated: (value: boolean) => void;
};

export const createRehydrationSlice: StateCreator<
  RehydrationSlice,
  [],
  [],
  RehydrationSlice
> = (set) => ({
  _hasHydrated: false,
  _setHasHydrated: (value: boolean) => {
    set({ _hasHydrated: value });
  },
});
