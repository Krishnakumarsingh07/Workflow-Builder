export type NodeType = "start" | "task" | "approval" | "automated" | "end";

export interface WorkflowNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: Record<string, any>;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;
}

export interface AutomationAction {
  id: string;
  label: string;
  params: string[];
}
