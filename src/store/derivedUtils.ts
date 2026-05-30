import useBoundStore from '.';

export function useTabLength() {
  return useBoundStore((s) => (s.notes[s.stringsInOrder[0]] || []).length);
}

export function useTotalBars() {
  const beatsPerBar = useBoundStore((s) => s.beatsPerBar);
  const tabLength = useTabLength();
  return Math.ceil(tabLength / beatsPerBar);
}

export function useTotalRows() {
  const totalBars = useTotalBars();
  const barsPerRow = useBoundStore((s) => s.barsPerRow);
  return Math.ceil(totalBars / barsPerRow);
}

export function useBeatsPerRow() {
  const beatsPerBar = useBoundStore((s) => s.beatsPerBar);
  const barsPerRow = useBoundStore((s) => s.barsPerRow);
  return beatsPerBar * barsPerRow;
}
