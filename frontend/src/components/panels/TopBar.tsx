import React, { useState } from 'react';
import { PlayCircle } from 'lucide-react';
import { useWorkflow } from '../../hooks/useWorkflow';
import { validateWorkflow, hasCycles } from '../../utils/validation';
import { simulateWorkflow } from '../../services/api';
import { setLogs } from '../../store/workflowStore';
import { TestPanel } from './TestPanel';

export const TopBar: React.FC = () => {
  const { nodes, edges, dispatch } = useWorkflow();
  const [isTestPanelOpen, setIsTestPanelOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTestWorkflow = async () => {
    setValidationErrors([]);
    dispatch(setLogs([]));
    setIsTestPanelOpen(true);

    const { valid, errors } = validateWorkflow(nodes, edges);
    const cycle = hasCycles(nodes, edges);

    const allErrors = [...errors];
    if (cycle) {
      allErrors.push("Workflow contains cyclic dependencies (loops).");
    }

    if (!valid || cycle) {
      setValidationErrors(allErrors);
      return;
    }

    setIsLoading(true);
    try {
      const resultLogs = await simulateWorkflow(nodes, edges);
      dispatch(setLogs(resultLogs));
    } catch (error) {
      setValidationErrors(["Failed to simulate workflow. Ensure backend is running."]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ nodes, edges }, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "workflow_export.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <>
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-20 shadow-sm relative">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">
            W
          </div>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">Workflow Designer</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 px-4 py-1.5 rounded-md font-medium transition-colors text-sm shadow-sm"
          >
            Export
          </button>
          <button
            onClick={handleTestWorkflow}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md font-medium transition-colors text-sm shadow-sm"
          >
            <PlayCircle size={16} />
            Test
          </button>
        </div>
      </header>

      {isTestPanelOpen && (
        <TestPanel 
          onClose={() => setIsTestPanelOpen(false)} 
          errors={validationErrors} 
          isLoading={isLoading} 
        />
      )}
    </>
  );
};
