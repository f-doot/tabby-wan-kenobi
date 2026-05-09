import type { StateCreator } from 'zustand';
import { type CollectionSlice, type TabbyState } from '../types';

const createCollectionSlice: StateCreator<
  TabbyState,
  [],
  [],
  CollectionSlice
> = (set, get) => ({
  tabs: {},
  upsertTab: (uid, tab) => {
    const tabs = { ...get().tabs };
    tabs[uid] = tab;
    set({ tabs });
  },
  deleteTab: (uid) => {
    const tabs = { ...get().tabs };
    delete tabs[uid];
    set({ tabs });
  },
});

export default createCollectionSlice;
