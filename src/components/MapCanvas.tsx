import React from 'react';

interface MapCanvasProps {
  children: React.ReactNode;
  className?: string;
}

export const MapCanvas: React.FC<MapCanvasProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`relative w-full h-[600px] bg-slate-50 rounded-lg border border-slate-200 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};