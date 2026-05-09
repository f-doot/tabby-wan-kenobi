import type { Mutate, StateCreator, StoreApi } from 'zustand';
import type { CommandModeSlice, TabbyState } from '../types';

type Get<T, K, F> = K extends keyof T ? T[K] : F;

export const commands: Record<
  string,
  {
    fn: (
      get: () => TabbyState,
      set: Get<Mutate<StoreApi<TabbyState>, []>, 'setState', never>,
      arg: string,
    ) => void;
    help: string;
  }
> = {
  save: {
    fn: (get) => {
      const curr = get();
      get().upsertTab(get().uid, {
        name: curr.name || 'Untitled',
        notes: curr.notes,
        stringsInOrder: curr.stringsInOrder,
      });
    },
    help: 'Upsert the current tab',
  },
  f: { fn: (get, set, arg) => {}, help: '' },
  fret: { fn: (arg) => {}, help: '' },
  help: {
    fn: (get) => {
      const mode = get().mode;
      if (mode !== 'HELP') {
        get().setMode('HELP');
      } else {
        get().resetMode();
      }
    },
    help: 'Show help',
  },
  name: {
    fn: (_, set, name) => set({ name }),
    help: 'Set the name for the tab',
  },
  load: { fn: (arg) => {}, help: '' },
  list: {
    fn: (get) => {
      console.info(get().tabs);
    },
    help: '',
  },
  clear: {
    fn: (get) => {
      get().clear();
    },
    help: 'Clear current application state',
  },
};

const createCommandModeSlice: StateCreator<
  TabbyState,
  [],
  [],
  CommandModeSlice
> = (set, get) => ({
  command: [],
  addCommandKey: (key) =>
    set((state) => ({ command: [...state.command, key] })),
  removeLastKeyFromCommand: () =>
    set((state) => ({
      command: [...state.command.slice(0, state.command.length - 1)],
    })),
  commandModeActive: false,
  setCommandModeActive: (commandModeActive) => set({ commandModeActive }),
  executeCommand: () => {
    const commandToExecute = get().command.slice(1).join('');
    const splits = commandToExecute.split(' ');
    if (splits[0] in commands) {
      const activeCommand = splits[0];
      const args = splits.slice(1).join(' ');
      commands[activeCommand].fn(get, set, args);
    }
    set({
      command: [],
      commandModeActive: false,
    });
  },
});

export default createCommandModeSlice;
