import { create } from 'zustand';
import { instruments, type Instrument, type Notation } from './types';

interface TabbyState<Instrument> {
  selectedString: string;
  cursorPosition: number;
  setSelectedString: (key: string) => void;
  setCursorPosition: (next: number) => void;
  tabs: Record<string, Array<Notation>>;
}

export function createTabbyStore<T extends Instrument>(instrument: T) {
  const stringsInOrder = instruments[instrument];
  return create<TabbyState<T>>((set) => ({
    selectedString: stringsInOrder[0],
    cursorPosition: 0,
    setSelectedString: (key: string) => set({ selectedString: key }),
    setCursorPosition: (nextPos: number) => set({ cursorPosition: nextPos }),
    tabs: Object.fromEntries(stringsInOrder.map((k) => [k, []])),
    updateString: (k: string, newValues: Array<Notation>) =>
      set((state) => ({ tabs: { ...state.tabs, [k]: newValues } })),
  }));
}
