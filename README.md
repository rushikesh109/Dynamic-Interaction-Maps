# Dynamic Interaction Maps

A React component library for building interactive node-based diagrams with smooth drag-and-drop functionality and dynamic edge connections.

## Installation

```bash
npm install dynamic-interaction-map
```

## Usage

```tsx
import { MapCanvas, Node, Edge } from '@yourusername/dynamic-interaction-maps';

function MyDiagram() {
  const [nodes, setNodes] = useState([
    { id: '1', x: 100, y: 100, label: 'Start' },
    { id: '2', x: 300, y: 200, label: 'Process' },
  ]);

  const handleNodeDrag = (id, newX, newY) => {
    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === id ? { ...node, x: newX, y: newY } : node
      )
    );
  };

  return (
    <MapCanvas>
      <Edge
        from={{ x: nodes[0].x + 60, y: nodes[0].y + 32 }}
        to={{ x: nodes[1].x + 60, y: nodes[1].y + 32 }}
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
  );
}
```

## Components

### MapCanvas

Container component that provides the drawing area for nodes and edges.

Props:
- `children`: React nodes to render
- `className`: Optional CSS classes

### Node

Draggable node component.

Props:
- `id`: Unique string identifier
- `x`: X coordinate
- `y`: Y coordinate
- `label`: Text to display
- `onDrag`: Callback function (id: string, newX: number, newY: number) => void
- `className`: Optional CSS classes

### Edge

Connector component that draws a curved line between two points.

Props:
- `from`: Starting point { x: number, y: number }
- `to`: Ending point { x: number, y: number }
- `className`: Optional CSS classes

## License

MIT