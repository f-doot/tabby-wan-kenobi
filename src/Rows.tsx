import useBoundStore from './store';

export default function Rows() {
  const barsPerRow = useBoundStore((s) => s.barsPerRow);
}
