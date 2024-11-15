import React, { useEffect, useRef, useState } from 'react';

interface NodeProps {
  id: string;
  x: number;
  y: number;
  label: string;
  onDrag: (id: string, newX: number, newY: number) => void;
  className?: string;
}

export const Node: React.FC<NodeProps> = ({
  id,
  x,
  y,
  label,
  onDrag,
  className = '',
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x, y });
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setPosition({ x, y });
  }, [x, y]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && nodeRef.current) {
      const parentRect = nodeRef.current.parentElement?.getBoundingClientRect();
      if (parentRect) {
        const newX = e.clientX - parentRect.left - dragOffset.current.x;
        const newY = e.clientY - parentRect.top - dragOffset.current.y;
        
        // Constrain to parent boundaries
        const constrainedX = Math.max(0, Math.min(newX, parentRect.width - nodeRef.current.offsetWidth));
        const constrainedY = Math.max(0, Math.min(newY, parentRect.height - nodeRef.current.offsetHeight));
        
        setPosition({ x: constrainedX, y: constrainedY });
        onDrag(id, constrainedX, constrainedY);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={nodeRef}
      className={`absolute cursor-move select-none bg-white rounded-lg shadow-lg border border-slate-200 p-4 min-w-[120px] text-center transition-shadow hover:shadow-xl ${
        isDragging ? 'shadow-xl z-50' : ''
      } ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseDown={handleMouseDown}
    >
      <span className="font-medium text-slate-700">{label}</span>
    </div>
  );
};