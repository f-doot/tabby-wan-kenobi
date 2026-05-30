import useBoundStore from './store';
import { useBeatsPerRow, useTotalRows } from './store/derivedUtils';
import TabSlice, { TabHeader } from './TabSlice';
import { rangeFromZero } from './utils';

// Not the kind of bar that has IPAs sadly
function Bar({ offset }: { offset: number }) {
  const beatsPerBar = useBoundStore((s) => s.beatsPerBar);
  return (
    <div className="bar">
      {rangeFromZero(beatsPerBar).map((position) => (
        <TabSlice key={position + offset} slicePosition={position + offset} />
      ))}
    </div>
  );
}

function Bars({ rowStartOffset }: { rowStartOffset: number }) {
  const beatsPerBar = useBoundStore((s) => s.beatsPerBar);

  const barsToRender = useBoundStore((s) => s.barsPerRow);

  const calculateOffset = (offset: number) =>
    rowStartOffset + offset * beatsPerBar;

  return (
    <>
      {rangeFromZero(barsToRender).map((offset) => (
        <Bar offset={calculateOffset(offset)} key={offset} />
      ))}
    </>
  );
}

function Row({ offset }: { offset: number }) {
  return (
    <>
      <TabHeader />
      <Bars rowStartOffset={offset} />
    </>
  );
}

export default function Layout() {
  const numberOfRows = useTotalRows();
  const offsetBase = useBeatsPerRow();

  return (
    <>
      {rangeFromZero(numberOfRows).map((row) => (
        <Row offset={row * offsetBase} key={row} />
      ))}
    </>
  );
}
