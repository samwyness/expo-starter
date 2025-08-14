import { deleteItemAsync, getItem, setItem } from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import {
  createRehydrationSlice,
  type RehydrationSlice,
} from './slices/rehydrationSlice';

type AuthState = {
  isLoggedIn: boolean;
  shouldCreateAccount: boolean;
  isVip: boolean;
};

type AuthActions = {
  signIn: () => void;
  signInAsVip: () => void;
  signOut: () => void;
};

type AuthStore = RehydrationSlice & AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get, store) => ({
      ...createRehydrationSlice(set, get, store),

      isLoggedIn: false,
      shouldCreateAccount: false,
      isVip: false,

      signIn: () => {
        set((state) => {
          return {
            ...state,
            isLoggedIn: true,
          };
        });
      },
      signInAsVip: () => {
        set((state) => {
          return {
            ...state,
            isVip: true,
            isLoggedIn: true,
          };
        });
      },
      signOut: () => {
        set((state) => {
          return {
            ...state,
            isVip: false,
            isLoggedIn: false,
          };
        });
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => ({
        setItem,
        getItem,
        removeItem: deleteItemAsync,
      })),
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        isVip: state.isVip,
      }),
      onRehydrateStorage: (state) => {
        return () => state._setHasHydrated(true);
      },
    },
  ),
);
