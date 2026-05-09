import type { StateCreator } from 'zustand';
import type { ControlSlice, TabbyState } from '../types';

const DEFAULT_MODE = 'EDITOR';

const createControlSlice: StateCreator<TabbyState, [], [], ControlSlice> = (
  set,
) => ({
  mode: DEFAULT_MODE,
  setMode: (mode) => set({ mode }),
  resetMode: () => set({ mode: DEFAULT_MODE }),
});

export default createControlSlice;
