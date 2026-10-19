import { useEffect, useState } from 'react';

interface LaserPointerProps {
  active: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function LaserPointer({ active, containerRef }: LaserPointerProps) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!active) {
      setPos(null);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        setPos({ x, y });
      } else {
        setPos(null);
      }
    };

    const handleMouseLeave = () => setPos(null);

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [active, containerRef]);

  if (!active || !pos) return null;

  return (
    <div
      className="pointer-events-none absolute z-50 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
      style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
    >
      <div className="relative flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-red-500/20 animate-ping absolute" />
        <div className="w-5 h-5 rounded-full bg-red-500/40 blur-[2px] absolute" />
        <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_12px_#ef4444] border border-white/80" />
      </div>
    </div>
  );
}
