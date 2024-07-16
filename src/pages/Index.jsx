import { useState, useCallback } from 'react';
import ReactFlow, { 
  MiniMap, 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState, 
  addEdge
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle } from 'lucide-react';

const nodeTypes = [
  { type: 'default', label: 'Default Node' },
  { type: 'input', label: 'Input Node' },
  { type: 'output', label: 'Output Node' },
];

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const Index = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const addNode = () => {
    const newNode = {
      id: `${nodes.length + 1}`,
      data: { label: `Node ${nodes.length + 1}` },
      position: { x: Math.random() * 500, y: Math.random() * 500 },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 p-4 bg-secondary flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Graphy Visualiser</h1>
        <Button 
          onClick={addNode} 
          className="mb-6 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <PlusCircle className="mr-2 h-5 w-5" /> Add Node
        </Button>
        <h2 className="text-lg font-semibold mb-4">Node Types</h2>
        {nodeTypes.map((type) => (
          <Card key={type.type} className="p-2 mb-2 cursor-move" draggable onDragStart={(event) => event.dataTransfer.setData('application/reactflow', type.type)}>
            {type.label}
          </Card>
        ))}
      </aside>
      <main className="flex-1 flex flex-col">
        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            defaultViewport={{ x: 0, y: 0, zoom: 0.5 }} // Set default zoom to 0.5 (zoomed out)
            minZoom={0.1} // Allow zooming out further
            maxZoom={4} // Limit maximum zoom
          >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>
        <footer className="p-4 bg-muted text-center">
          <p>© 2024 Graph Program Interface. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;