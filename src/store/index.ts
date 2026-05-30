import { create } from 'zustand';
import type { TabbyState } from '../types';
import createNotationSlice from './notationSlice';
import createPositionSlice from './positionSlice';
import createCommandModeSlice from './commandModeSlice';
import createMetadataSlice from './metadataSlice';
import { createJSONStorage, persist } from 'zustand/middleware';
import createCollectionSlice from './collectionSlice';
import createControlSlice from './controlSlice';

const useBoundStore = create<TabbyState>()(
  persist(
    (...a) => ({
      ...createNotationSlice(...a),
      ...createPositionSlice(...a),
      ...createCommandModeSlice(...a),
      ...createMetadataSlice(...a),
      ...createCollectionSlice(...a),
      ...createControlSlice(...a),
    }),
    {
      name: 'tabby-state',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useBoundStore;
