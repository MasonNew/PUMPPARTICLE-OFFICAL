import { Scene } from './components/Scene';
import { Overlay } from './components/ui/Overlay';

function App() {
  return (
    <div className="relative w-full h-screen bg-black">
      <Scene />
      <Overlay />
    </div>
  );
}

export default App;