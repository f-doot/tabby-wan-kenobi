import { useEffect, useRef } from 'react';
import useBoundStore from './store';

type Commands = Record<string, () => void>;

const notationKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-'];

export default function useKeyboardCommands(
  commandMap: Commands,
  handleDefault: (command: string) => void,
) {
  const commandsRef = useRef(commandMap);
  const defaultRef = useRef(handleDefault);

  const setIsCommandMode = useBoundStore((s) => s.setCommandModeActive);
  const addKeyToCommand = useBoundStore((s) => s.addCommandKey);
  const backspaceCommand = useBoundStore((s) => s.removeLastKeyFromCommand);
  const commandModeActive = useBoundStore((s) => s.commandModeActive);
  const executeCommand = useBoundStore((s) => s.executeCommand);
  useEffect(() => {
    commandsRef.current = commandMap;
    defaultRef.current = handleDefault;
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key, ctrlKey, metaKey, shiftKey } = event;
      const commandKey = `${ctrlKey || metaKey ? 'mod+' : ''}${key.toLowerCase()}`;

      if (['Shift', 'Alt', 'Control'].includes(key)) {
        // Let's ignore modifier keys
        return;
      }

      if (commandModeActive) {
        if (key === 'Enter') {
          executeCommand();
          return;
        }
        if (key === 'Backspace') {
          backspaceCommand();
          return;
        }
        addKeyToCommand(key);
        return;
      }

      if (commandKey === ':') {
        setIsCommandMode(true);
        addKeyToCommand(commandKey);
        return;
      }

      if (commandsRef.current[commandKey]) {
        console.info('Handling known command', commandKey);
        event.preventDefault();
        commandsRef.current[commandKey]();
        return;
      }

      if (notationKeys.includes(commandKey)) {
        console.info('Handling notation key', commandKey);
        event.preventDefault();
        defaultRef.current(commandKey);
        return;
      }

      console.info('Received non command value', commandKey);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandModeActive]);
}
