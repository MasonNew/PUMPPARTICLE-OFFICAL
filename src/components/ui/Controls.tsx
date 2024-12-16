import { Network } from 'lucide-react';

export function Controls() {
  const controls = [
    { label: 'Rotate', key: 'LMB' },
    { label: 'Pan', key: 'RMB' },
    { label: 'Zoom', key: 'Wheel' },
  ];

  return (
    <div className="absolute bottom-6 right-6 flex flex-col items-end space-y-2">
      <div className="flex items-center space-x-2 text-cyan-400/80 mb-2 animate-fade-in">
        <Network className="w-4 h-4 animate-glow" />
        <span className="text-sm font-mono">System Controls</span>
      </div>
      {controls.map((control, index) => (
        <div 
          key={control.label} 
          className="flex items-center space-x-2 text-sm font-mono animate-slide-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <span className="text-cyan-400/80">{control.label}</span>
          <span className="px-2 py-1 bg-cyan-400/10 text-cyan-400 rounded border border-cyan-400/20 hover:bg-cyan-400/20 transition-colors">
            {control.key}
          </span>
        </div>
      ))}
    </div>
  );
}