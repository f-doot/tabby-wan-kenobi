import './App.css';

import { useEffect } from 'react';
import useKeyboardCommands from './useKeyboardCommands';
import useBoundStore from './store';
import { TabEnd } from './TabSlice';
import Help from './Help';
import Footer from './Footer';
import Layout from './Layout';

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

  return (
    <div className="content">
      <h1>Tabby Wan Kenobi</h1>
      Tab name: {name}
      <div className="tab">
        <Layout />
        <TabEnd />
      </div>
      <div className="command">{currentCommand}</div>
      <Help />
      <Footer />
    </div>
  );
};

export default App;
