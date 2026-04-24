import React, { useEffect, useState } from 'react';
import { useWorkflow } from '../../hooks/useWorkflow';
import { fetchAutomations } from '../../services/api';
import type { AutomationAction } from '../../types/workflow';
import { Trash2 } from 'lucide-react';

export const NodeConfigForm: React.FC = () => {
  const { selectedNode, updateNode, deleteNode } = useWorkflow();
  const [automations, setAutomations] = useState<AutomationAction[]>([]);

  useEffect(() => {
    if (selectedNode?.type === 'automated') {
      fetchAutomations().then(setAutomations).catch(console.error);
    }
  }, [selectedNode?.type]);

  const today = new Date().toISOString().split('T')[0];

  if (!selectedNode) {
    return (
      <div className="w-0 overflow-hidden transition-all duration-300 bg-white border-l border-slate-200"></div>
    );
  }

  const { id, type, data } = selectedNode;

  const handleChange = (key: string, value: any) => {
    updateNode(id, { [key]: value });
  };

  return (
    <div className="w-[280px] bg-white border-l border-slate-200 flex flex-col h-full z-10 shadow-[-4px_0_15px_rgba(0,0,0,0.03)] transition-all duration-300">
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700 capitalize flex items-center gap-2">
          {type} Node Properties
        </h3>
        <button
          onClick={() => deleteNode(id)}
          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
          title="Delete Node"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Common Title Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600">Node Title <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={data.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            className="px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
            placeholder="Enter node title"
            required
          />
        </div>

        {/* Start Node Fields */}
        {type === 'start' && (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">Metadata (JSON)</label>
            <textarea
              value={data.metadata ? JSON.stringify(data.metadata, null, 2) : ''}
              onChange={(e) => {
                try {
                  const val = e.target.value ? JSON.parse(e.target.value) : {};
                  handleChange('metadata', val);
                } catch (err) {
                  // Ignore invalid JSON while typing
                }
              }}
              className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-700 font-mono text-xs min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm resize-y"
              placeholder='{\n  "key": "value"\n}'
            />
          </div>
        )}

        {/* Task Node Fields */}
        {type === 'task' && (
          <>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600">Description</label>
              <textarea
                value={data.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                className="px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm resize-y"
                rows={3}
                placeholder="Task description..."
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600">Assignee</label>
              <input
                type="text"
                value={data.assignee || ''}
                onChange={(e) => handleChange('assignee', e.target.value)}
                className="px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                placeholder="e.g. HR Department"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600">Due Date</label>
              <input
                type="date"
                min={today}
                value={data.dueDate || ''}
                onChange={(e) => handleChange('dueDate', e.target.value)}
                className="px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
          </>
        )}

        {/* Approval Node Fields */}
        {type === 'approval' && (
          <>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600">Approver Role</label>
              <select
                value={data.approverRole || 'Manager'}
                onChange={(e) => handleChange('approverRole', e.target.value)}
                className="px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%2020%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%20fill%3D%22%2394a3b8%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-right pr-8"
              >
                <option value="Manager">Manager</option>
                <option value="HR">HR Business Partner</option>
                <option value="Director">Director</option>
                <option value="System">System Auto-Approval</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600">Auto-Approve Threshold (Days)</label>
              <input
                type="number"
                value={data.autoApproveThreshold || 0}
                onChange={(e) => handleChange('autoApproveThreshold', parseInt(e.target.value))}
                className="px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                min="0"
              />
            </div>
          </>
        )}

        {/* Automated Step Node Fields */}
        {type === 'automated' && (
          <>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600">System Action <span className="text-red-500">*</span></label>
              <select
                value={data.action || ''}
                onChange={(e) => {
                  const newAction = e.target.value;
                  handleChange('action', newAction);
                  handleChange('params', {}); // Reset params on action change
                }}
                className="px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%2020%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%20fill%3D%22%2394a3b8%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-right pr-8"
              >
                <option value="">Select Action...</option>
                {automations.map(auto => (
                  <option key={auto.id} value={auto.id}>{auto.label}</option>
                ))}
              </select>
            </div>

            {data.action && (
              <div className="mt-4 space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-semibold text-slate-600">Action Parameters</h4>
                {automations.find(a => a.id === data.action)?.params.map(param => (
                  <div key={param} className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-slate-500 capitalize">{param.replace('_', ' ')}</label>
                    <input
                      type="text"
                      value={data.params?.[param] || ''}
                      onChange={(e) => handleChange('params', { ...data.params, [param]: e.target.value })}
                      className="px-3 py-1.5 bg-white border border-slate-300 rounded-md text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* End Node Fields */}
        {type === 'end' && (
          <>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600">Completion Message</label>
              <textarea
                value={data.message || ''}
                onChange={(e) => handleChange('message', e.target.value)}
                className="px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm resize-y"
                rows={3}
                placeholder="Workflow completed successfully."
              />
            </div>
            <div className="flex items-center gap-2 mt-3">
              <input
                type="checkbox"
                id="summaryFlag"
                checked={!!data.summaryFlag}
                onChange={(e) => handleChange('summaryFlag', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <label htmlFor="summaryFlag" className="text-sm font-medium text-slate-700 cursor-pointer select-none">
                Generate Summary Report
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
