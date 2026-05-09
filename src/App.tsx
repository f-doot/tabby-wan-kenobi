import './App.css';

import { useEffect } from 'react';
import useKeyboardCommands from './useKeyboardCommands';
import useBoundStore, { useTabLength } from './store';
import TabSlice, { TabEnd, TabHeader } from './TabSlice';
import Help from './Help';

const App = () => {
  const setInitial = useBoundStore((s) => s.setInitial);
  const deltaPosition = useBoundStore((s) => s.deltaPosition);
  const nextString = useBoundStore((s) => s.nextString);
  const previousString = useBoundStore((s) => s.previousString);
  const setNote = useBoundStore((s) => s.setCurrentNote);
  const currentCommand = useBoundStore((s) => s.command);
  useEffect(() => {
    const currentState = useBoundStore.getState();

    if (
      !currentState.stringsInOrder ||
      currentState.stringsInOrder.length === 0
    ) {
      setInitial(0, ['G', 'D', 'A', 'E']);
    }
  }, []);
  const name = useBoundStore((s) => s.name);

  const commands = {
    arrowdown: nextString,
    arrowup: previousString,
    arrowleft: () => deltaPosition(-1),
    arrowright: () => deltaPosition(1),
    ' ': () => setNote('-'),
  };
  const handleDefault = setNote;
  useKeyboardCommands(commands, handleDefault);
  const tabLength = useTabLength();

  return (
    <div className="content">
      <h1>Tabby Wan Kenobi</h1>
      Tab name: {name}
      <div className="tab">
        <TabHeader />
        {[...Array(tabLength).keys()].map((position) => (
          <TabSlice key={position} slicePosition={position} />
        ))}
        <TabEnd />
      </div>
      <div className="command">{currentCommand}</div>
      <Help />
    </div>
  );
};

export default App;
