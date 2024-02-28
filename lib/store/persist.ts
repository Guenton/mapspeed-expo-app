import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type PersistState = {
  jwt: string;
  setJwt: (jwt: string) => void;
};

/**
 * usePersistStore store will persist the data even after the application is closed.
 *
 * It's built with the `zustand` package: https://www.npmjs.com/package/zustand
 *
 */
export const usePersistStore = create<PersistState>()(
  persist(
    (set) => ({
      jwt: '',
      setJwt: (jwt = '') => set(() => ({ jwt })),
    }),
    {
      name: 'persist',
      storage: createJSONStorage(() => (Platform.OS === 'web' ? localStorage : AsyncStorage)),
    },
  ),
);
