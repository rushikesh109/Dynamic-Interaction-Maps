import { useState } from 'react';
import { MapCanvas } from './components/MapCanvas';
import { Node } from './components/Node';
import { Edge } from './components/Edge';
import { ArrowUpRight } from 'lucide-react';

interface NodeData {
  id: string;
  x: number;
  y: number;
  label: string;
}

function App() {
  const [nodes, setNodes] = useState<NodeData[]>([
    { id: '1', x: 100, y: 100, label: 'Start' },
    { id: '2', x: 300, y: 200, label: 'Process' },
    { id: '3', x: 500, y: 100, label: 'End' },
  ]);

  const handleNodeDrag = (id: string, newX: number, newY: number) => {
    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === id ? { ...node, x: newX, y: newY } : node
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            Dynamic Interaction Maps
            <ArrowUpRight className="w-8 h-8 text-blue-500" />
          </h1>
          <p className="text-slate-600 mt-2">
            Drag the nodes to update the connection lines. The map automatically adjusts to maintain connections.
          </p>
        </div>

        <MapCanvas>
          {/* Render edges first so they appear behind nodes */}
          <Edge
            from={{ x: nodes[0].x + 60, y: nodes[0].y + 32 }}
            to={{ x: nodes[1].x + 60, y: nodes[1].y + 32 }}
          />
          <Edge
            from={{ x: nodes[1].x + 60, y: nodes[1].y + 32 }}
            to={{ x: nodes[2].x + 60, y: nodes[2].y + 32 }}
          />
          
          {nodes.map(node => (
            <Node
              key={node.id}
              id={node.id}
              x={node.x}
              y={node.y}
              label={node.label}
              onDrag={handleNodeDrag}
            />
          ))}
        </MapCanvas>

        <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-2">Instructions</h2>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            <li>Click and drag any node to move it</li>
            <li>Connection lines automatically update</li>
            <li>Nodes stay within the canvas boundaries</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;