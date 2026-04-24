import React, { useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useReactFlow
} from 'reactflow';
import type {
  NodeTypes
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useWorkflow } from '../../hooks/useWorkflow';
import { StartNode, TaskNode, ApprovalNode, AutomatedNode, EndNode } from '../nodes/CustomNodes';
import { CustomEdge } from '../edges/CustomEdge';
import type { NodeType } from '../../types/workflow';

const nodeTypes: NodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

const WorkflowCanvasInner: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();
  const {
    nodes,
    edges,
    handleNodesChange,
    handleEdgesChange,
    handleConnect,
    createNode,
    selectNode
  } = useWorkflow();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as NodeType;

      if (typeof type === 'undefined' || !type) {
        return;
      }

      if (!reactFlowWrapper.current) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      createNode(type, position);
    },
    [createNode, screenToFlowPosition]
  );

  return (
    <div className="flex-1 h-full relative" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={(_, node) => selectNode(node.id)}
        onPaneClick={() => selectNode(null)}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{ type: 'custom' }}
        fitView
        className="w-full h-full bg-slate-50"
      >
        <Background color="#cbd5e1" gap={16} />
        <Controls className="bg-white shadow-md border-slate-200 rounded-lg" />
        <MiniMap zoomable pannable nodeStrokeColor={(n) => {
          if (n.type === 'start') return '#22c55e';
          if (n.type === 'task') return '#3b82f6';
          if (n.type === 'approval') return '#f97316';
          if (n.type === 'automated') return '#a855f7';
          if (n.type === 'end') return '#ef4444';
          return '#eee';
        }} nodeColor={(n) => {
          if (n.type === 'start') return '#22c55e';
          if (n.type === 'task') return '#3b82f6';
          if (n.type === 'approval') return '#f97316';
          if (n.type === 'automated') return '#a855f7';
          if (n.type === 'end') return '#ef4444';
          return '#fff';
        }} />
      </ReactFlow>
    </div>
  );
};

export const WorkflowCanvas: React.FC = () => (
  <ReactFlowProvider>
    <WorkflowCanvasInner />
  </ReactFlowProvider>
);
