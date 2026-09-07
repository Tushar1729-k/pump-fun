import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

/**
 * Progress state only. The program itself is static data (src/data/program.ts),
 * so this store stays tiny and the persisted payload stays readable.
 *
 * Storage is AsyncStorage so it runs in Expo Go. Swap `createJSONStorage(() => AsyncStorage)`
 * for an MMKV adapter once we move to a native dev build.
 */

export interface ProgramState {
  startedAt: string | null;
  /** taskId -> ISO timestamp */
  doneTasks: Record<string, string>;
  /** sessionId -> ISO timestamp */
  doneSessions: Record<string, string>;

  start: () => void;
  toggleTask: (taskId: string) => void;
  completeSession: (sessionId: string) => void;
  reset: () => void;
}

const initial = {
  startedAt: null,
  doneTasks: {},
  doneSessions: {},
};

export const useProgramStore = create<ProgramState>()(
  persist(
    (set) => ({
      ...initial,

      start: () => set((s) => (s.startedAt ? s : { startedAt: new Date().toISOString() })),

      toggleTask: (taskId) =>
        set((s) => {
          const doneTasks = { ...s.doneTasks };
          if (doneTasks[taskId]) delete doneTasks[taskId];
          else doneTasks[taskId] = new Date().toISOString();
          return { doneTasks };
        }),

      completeSession: (sessionId) =>
        set((s) => ({
          doneSessions: { ...s.doneSessions, [sessionId]: new Date().toISOString() },
          startedAt: s.startedAt ?? new Date().toISOString(),
        })),

      reset: () => set({ ...initial }),
    }),
    {
      name: 'pump-prep/progress/v1',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
