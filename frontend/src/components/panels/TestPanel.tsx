import React from 'react';
import { X, AlertCircle, CheckCircle2, Loader2, ListOrdered } from 'lucide-react';
import { useWorkflow } from '../../hooks/useWorkflow';

interface TestPanelProps {
  onClose: () => void;
  errors: string[];
  isLoading: boolean;
}

export const TestPanel: React.FC<TestPanelProps> = ({ onClose, errors, isLoading }) => {
  const { logs } = useWorkflow();

  return (
    <div className="fixed inset-y-0 right-0 w-[400px] bg-white shadow-[-4px_0_24px_rgba(0,0,0,0.1)] z-50 flex flex-col transform transition-transform duration-300">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-2">
          <ListOrdered size={20} className="text-slate-600" />
          <h2 className="text-lg font-bold text-slate-800">Execution Sandbox</h2>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center gap-2 text-red-700 font-semibold mb-2">
              <AlertCircle size={18} />
              <span>Validation Errors ({errors.length})</span>
            </div>
            <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500">
            <Loader2 size={32} className="animate-spin mb-4 text-blue-500" />
            <p className="font-medium">Simulating workflow execution...</p>
          </div>
        )}

        {!isLoading && errors.length === 0 && logs.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-600 font-semibold px-2">
              <CheckCircle2 size={20} />
              <span>Simulation Successful</span>
            </div>
            <div className="relative">
              <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-slate-200"></div>
              <ul className="space-y-4">
                {logs.map((log, index) => (
                  <li key={index} className="relative flex items-start gap-4">
                    <div className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 border-2 border-white shadow-sm text-blue-600 font-bold text-xs">
                      {index + 1}
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex-1 shadow-sm text-sm text-slate-700">
                      {log}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {!isLoading && errors.length === 0 && logs.length === 0 && (
          <div className="text-center text-slate-500 py-12">
            No logs to display. Run simulation to see results.
          </div>
        )}
      </div>
    </div>
  );
};
