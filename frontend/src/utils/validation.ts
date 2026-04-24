import type { Node, Edge } from 'reactflow';

export const validateWorkflow = (nodes: Node[], edges: Edge[]): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  const startNodes = nodes.filter(n => n.type === 'start');
  if (startNodes.length === 0) {
    errors.push('Workflow must have exactly one Start Node.');
  } else if (startNodes.length > 1) {
    errors.push('Workflow can only have one Start Node.');
  }

  const endNodes = nodes.filter(n => n.type === 'end');
  if (endNodes.length === 0) {
    errors.push('Workflow must have at least one End Node.');
  }

  if (nodes.length > 0) {
    const connectedNodeIds = new Set<string>();
    edges.forEach(e => {
      connectedNodeIds.add(e.source);
      connectedNodeIds.add(e.target);
    });

    const disconnectedNodes = nodes.filter(n => !connectedNodeIds.has(n.id) && nodes.length > 1);
    if (disconnectedNodes.length > 0) {
      errors.push('All nodes must be connected.');
    }
  }

  // Required fields validation
  nodes.forEach(node => {
    if (node.type === 'task' && !node.data.title) {
      errors.push(`Task Node (${node.id}) is missing a title.`);
    }
    if (node.type === 'automated' && !node.data.action) {
      errors.push(`Automated Step Node (${node.id}) is missing an action.`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
};

export const hasCycles = (nodes: Node[], edges: Edge[]): boolean => {
  const adjList = new Map<string, string[]>();
  nodes.forEach(n => adjList.set(n.id, []));
  edges.forEach(e => {
    if (adjList.has(e.source)) {
      adjList.get(e.source)!.push(e.target);
    }
  });

  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  const isCyclicUtil = (nodeId: string): boolean => {
    if (!visited.has(nodeId)) {
      visited.add(nodeId);
      recursionStack.add(nodeId);

      const neighbors = adjList.get(nodeId) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor) && isCyclicUtil(neighbor)) {
          return true;
        } else if (recursionStack.has(neighbor)) {
          return true;
        }
      }
    }
    recursionStack.delete(nodeId);
    return false;
  };

  for (const node of nodes) {
    if (isCyclicUtil(node.id)) {
      return true;
    }
  }

  return false;
};
