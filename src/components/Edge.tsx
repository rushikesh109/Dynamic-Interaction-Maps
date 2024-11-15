import React, { useMemo } from 'react';

interface Point {
  x: number;
  y: number;
}

interface EdgeProps {
  from: Point;
  to: Point;
  className?: string;
}

export const Edge: React.FC<EdgeProps> = ({ from, to, className = '' }) => {
  const pathData = useMemo(() => {
    // Calculate control points for a curved line
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const curve = Math.min(Math.abs(dx), Math.abs(dy)) * 0.5;
    
    return `M ${from.x} ${from.y} 
            Q ${midX} ${from.y} ${midX} ${midY}
            Q ${midX} ${to.y} ${to.x} ${to.y}`;
  }, [from, to]);

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <path
        d={pathData}
        className={`stroke-slate-300 fill-none ${className}`}
        strokeWidth="2"
      />
    </svg>
  );
};