import { useEffect, useState } from 'react';

export function Stats() {
  const [stats, setStats] = useState({
    fps: 0,
    particles: Math.pow(2, 16),
    temperature: 42.5,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        fps: 60 + Math.floor(Math.random() * 5),
        temperature: 42.5 + Math.random(),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-6 left-6 space-y-2">
      {Object.entries(stats).map(([key, value], index) => (
        <div 
          key={key} 
          className="flex items-center space-x-2 text-sm font-mono animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="relative">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-glow" />
            <div className="absolute -inset-1 bg-cyan-400/20 rounded-full blur-sm -z-10" />
          </div>
          <span className="text-cyan-400/80 uppercase">{key}:</span>
          <span className="text-cyan-400">
            {typeof value === 'number' ? value.toFixed(1) : value}
          </span>
        </div>
      ))}
    </div>
  );
}