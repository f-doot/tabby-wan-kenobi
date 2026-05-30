export type Notation = string;

export type Instrument = '4-String Bass Guitar';

export type InstrumentShape = Record<Instrument, Array<string>>;

const fourStringBassStrings = ['G', 'D', 'A', 'E'] as const;
type FourStringBassStrings = typeof fourStringBassStrings;

export const instruments: InstrumentShape = {
  '4-String Bass Guitar': ['G', 'D', 'A', 'E'],
};

export type CommandModeSlice = {
  command: Array<string>;
  addCommandKey: (key: string) => void;
  removeLastKeyFromCommand: () => void;
  commandModeActive: boolean;
  setCommandModeActive: (v: boolean) => void;
  executeCommand: () => void;
};

export type NotationSlice = {
  notes: { [key: string]: Array<Notation> };
  setCurrentNote: (note: Notation) => void;
  beatsPerBar: number;
  setBeatsPerBar: (beats: number) => void;
};

export type PositionSlice = {
  selectedString: string;
  position: number;
  stringsInOrder: Array<string>;
  setSelectedString: (key: string) => void;
  nextString: () => void;
  previousString: () => void;
  setPosition: (position: number) => void;
  deltaPosition: (delta: number) => void;
  setInitial: (
    position: number,
    stringsInOrder: Array<string>,
    selectedString?: string,
  ) => void;
};

export type MetadataSlice = {
  name?: string;
  uid: string;
  setName: (next: string) => void;
  clear: () => void;
};

export type CollectionSlice = {
  tabs: { [key: string]: Tab };
  upsertTab: (uid: string, tab: Tab) => void;
  deleteTab: (uid: string) => void;
};

export type ControlMode = 'EDITOR' | 'LIST' | 'HELP';
export type ControlSlice = {
  mode: ControlMode;
  setMode: (next: ControlMode) => void;
  resetMode: () => void;
};

export type TabbyState = ControlSlice &
  CommandModeSlice &
  NotationSlice &
  PositionSlice &
  MetadataSlice &
  CollectionSlice;

export type Tab = {
  name: string;
  beatsPerBar: number;
  stringsInOrder: Array<string>;
  notes: { [key: string]: Array<Notation> };
};
