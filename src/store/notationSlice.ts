import type { StateCreator } from 'zustand';
import type { NotationSlice, TabbyState } from '../types';

const createNotationSlice: StateCreator<TabbyState, [], [], NotationSlice> = (
  set,
  get,
) => ({
  notes: {},
  setCurrentNote: (note) => {
    const { position, selectedString, notes } = get();
    const newNotes: { [key: string]: Array<string> } = {};
    Object.keys(notes).forEach((n) => {
      newNotes[n] = [...notes[n]];
    });

    if (newNotes[selectedString].length === position) {
      Object.entries(newNotes).forEach(([, v]) => (v[position] = '-'));
      newNotes[selectedString][position] = note;
      set({ notes: newNotes, position: position + 1 });
    } else {
      newNotes[selectedString][position] = note;
      set({ notes: newNotes });
    }
  },
  beatsPerBar: 8,
  setBeatsPerBar: (beatsPerBar) => set({ beatsPerBar }),
});

export default createNotationSlice;
