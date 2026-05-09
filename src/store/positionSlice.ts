import type { StateCreator } from 'zustand';
import type { PositionSlice, TabbyState } from '../types';
import { clamped } from '../utils';

function newSelectedString(state: PositionSlice, delta: number) {
  const index = state.stringsInOrder.indexOf(state.selectedString);
  return state.stringsInOrder[
    clamped(index + delta, 0, state.stringsInOrder.length - 1)
  ];
}

const createPositionSlice: StateCreator<TabbyState, [], [], PositionSlice> = (
  set,
  get,
) => ({
  selectedString: '',
  position: 0,
  stringsInOrder: [],
  setSelectedString: (key) => set({ selectedString: key }),
  nextString: () =>
    set((state) => ({ selectedString: newSelectedString(state, 1) })),
  previousString: () =>
    set((state) => ({ selectedString: newSelectedString(state, -1) })),
  setPosition: (position) => set({ position }),
  deltaPosition: (delta) =>
    set((state) => ({
      position: clamped(
        state.position + delta,
        0,
        get().notes[get().stringsInOrder[0]].length,
      ),
    })),
  setInitial: (position, stringsInOrder, selectedString) =>
    set({
      position,
      stringsInOrder,
      selectedString: selectedString || stringsInOrder[0],
      notes: Object.fromEntries(stringsInOrder.map((v) => [v, []])),
    }),
});

export default createPositionSlice;
