import classNames from 'classnames';
import useBoundStore, { useTabLength } from './store';
import './App.css';
import type React from 'react';

type TabSliceProps = {
  slicePosition: number;
};

export default function TabSlice({ slicePosition }: TabSliceProps) {
  const notes = useBoundStore((s) => s.notes);
  const stringsInOrder = useBoundStore((s) => s.stringsInOrder);
  const position = useBoundStore((s) => s.position);
  const selectedString = useBoundStore((s) => s.selectedString);

  return (
    <div className="tab-slice">
      {stringsInOrder.map((str) => (
        <Sting key={str} isStringSelected={str === selectedString}>
          <Note
            isNoteSelected={
              str === selectedString && position === slicePosition
            }
          >
            {notes[str][slicePosition]}
          </Note>
        </Sting>
      ))}
    </div>
  );
}

export function TabHeader() {
  const stringsInOrder = useBoundStore((s) => s.stringsInOrder);
  const selectedString = useBoundStore((s) => s.selectedString);

  return (
    <div className="tab-slice">
      {stringsInOrder.map((str) => (
        <Sting key={str} isStringSelected={str === selectedString}>
          <Note isNoteSelected={false}>{str}</Note>
        </Sting>
      ))}
    </div>
  );
}

export function TabEnd() {
  const stringsInOrder = useBoundStore((s) => s.stringsInOrder);
  const selectedString = useBoundStore((s) => s.selectedString);
  const position = useBoundStore((s) => s.position);
  const tabLength = useTabLength();

  return (
    <div className="tab-slice">
      {stringsInOrder.map((str) => (
        <Sting key={str} isStringSelected={str === selectedString}>
          <Note
            isNoteSelected={str === selectedString && tabLength === position}
          >
            _
          </Note>
        </Sting>
      ))}
    </div>
  );
}

function Sting({
  isStringSelected,
  children,
}: {
  isStringSelected: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={classNames('string', { 'string-selected': isStringSelected })}
    >
      {children}
    </span>
  );
}

function Note({
  children,
  isNoteSelected,
  pulse,
}: {
  children: string;
  isNoteSelected: boolean;
  pulse?: boolean;
}) {
  return (
    <span
      className={classNames(
        'note',
        { blank: children === '-' },
        { cursor: isNoteSelected },
        { pulse: !isNoteSelected && pulse },
      )}
    >
      {children}
    </span>
  );
}
