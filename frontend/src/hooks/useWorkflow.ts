import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/workflowStore';
import {
  onNodesChange,
  onEdgesChange,
  onConnect,
  addNode,
  updateNodeData,
  setSelectedNodeId,
  deleteNodeById
} from '../store/workflowStore';
import type { Node, Connection, NodeChange, EdgeChange } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import type { NodeType } from '../types/workflow';

export const useWorkflow = () => {
  const dispatch = useDispatch<AppDispatch>();
  const nodes = useSelector((state: RootState) => state.workflow.nodes);
  const edges = useSelector((state: RootState) => state.workflow.edges);
  const selectedNodeId = useSelector((state: RootState) => state.workflow.selectedNodeId);
  const logs = useSelector((state: RootState) => state.workflow.logs);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null;

  const handleNodesChange = useCallback((changes: NodeChange[]) => {
    dispatch(onNodesChange(changes));
  }, [dispatch]);

  const handleEdgesChange = useCallback((changes: EdgeChange[]) => {
    dispatch(onEdgesChange(changes));
  }, [dispatch]);

  const handleConnect = useCallback((connection: Connection) => {
    dispatch(onConnect(connection));
  }, [dispatch]);

  const createNode = useCallback((type: NodeType, position: { x: number; y: number }) => {
    // Prevent multiple start nodes
    if (type === 'start' && nodes.some(n => n.type === 'start')) {
      alert("Only one Start Node is allowed");
      return;
    }

    const newNode: Node = {
      id: `${type}-${uuidv4()}`,
      type,
      position,
      data: { title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}` },
    };

    if (type === 'task') {
      newNode.data = { ...newNode.data, description: '', assignee: '', dueDate: '', customFields: {} };
    } else if (type === 'approval') {
      newNode.data = { ...newNode.data, approverRole: 'Manager', autoApproveThreshold: 0 };
    } else if (type === 'automated') {
      newNode.data = { ...newNode.data, action: '', params: {} };
    } else if (type === 'end') {
      newNode.data = { ...newNode.data, message: '', summaryFlag: false };
    }

    dispatch(addNode(newNode));
  }, [dispatch, nodes]);

  const updateNode = useCallback((id: string, data: any) => {
    dispatch(updateNodeData({ id, data }));
  }, [dispatch]);

  const selectNode = useCallback((id: string | null) => {
    dispatch(setSelectedNodeId(id));
  }, [dispatch]);

  const deleteNode = useCallback((id: string) => {
    dispatch(deleteNodeById(id));
  }, [dispatch]);

  return {
    nodes,
    edges,
    selectedNode,
    logs,
    handleNodesChange,
    handleEdgesChange,
    handleConnect,
    createNode,
    updateNode,
    selectNode,
    deleteNode,
    dispatch,
  };
};
