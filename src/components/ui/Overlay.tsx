import { Stats } from './Stats';
import { Controls } from './Controls';

export function Overlay() {
  return (
    <div className="pointer-events-none">
      <Stats />
      <Controls />
    </div>
  );
}