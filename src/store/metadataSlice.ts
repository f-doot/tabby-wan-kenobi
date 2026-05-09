import type { StateCreator } from 'zustand';
import { type MetadataSlice, type TabbyState } from '../types';

import { v4 } from 'uuid';

const createMetadataSlice: StateCreator<TabbyState, [], [], MetadataSlice> = (
  set,
  get,
) => ({
  uid: v4(),
  setName: (name) => set({ name }),
  clear: () => {
    get().setInitial(0, ['G', 'D', 'A', 'E']);
    set({
      name: undefined,
      uid: v4(),
    });
  },
});

export default createMetadataSlice;
