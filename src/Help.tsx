import { commands } from './store/commandModeSlice';
import styles from './Help.module.css';
import useBoundStore from './store';

export default function Help() {
  const showHelp = useBoundStore((s) => s.mode) === 'HELP';
  if (!showHelp) return;
  return (
    <div className={styles.entries}>
      {Object.entries(commands)
        .filter(([_k, { help }]) => help !== '')
        .map(([k, { help }]) => (
          <span key={k}>
            :{k} | {help}
          </span>
        ))}
    </div>
  );
}
