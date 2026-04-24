import axios from 'axios';
import type { Node, Edge } from 'reactflow';
import type { AutomationAction } from '../types/workflow';

const API_URL = 'http://localhost:5000';

export const fetchAutomations = async (): Promise<AutomationAction[]> => {
  const response = await axios.get(`${API_URL}/automations`);
  return response.data;
};

export const simulateWorkflow = async (nodes: Node[], edges: Edge[]): Promise<string[]> => {
  const response = await axios.post(`${API_URL}/simulate`, { nodes, edges });
  return response.data;
};
