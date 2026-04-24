import type { Node, Edge } from 'reactflow';

export const serializeGraph = (nodes: Node[], edges: Edge[]) => {
  return {
    nodes,
    edges,
  };
};

export const deserializeGraph = (data: any) => {
  return {
    nodes: data.nodes || [],
    edges: data.edges || [],
  };
};
