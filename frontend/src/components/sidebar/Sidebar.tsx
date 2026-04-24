import React from 'react';
import { Play, CheckSquare, UserCheck, Zap, Square } from 'lucide-react';
import type { NodeType } from '../../types/workflow';

const NODE_TYPES: { type: NodeType; label: string; icon: React.ElementType; color: string; desc: string; bg: string }[] = [
  { type: 'start', label: 'Start Node', icon: Play, color: 'text-green-600', bg: 'bg-green-50 border-green-200', desc: 'Entry point' },
  { type: 'task', label: 'Manual Task', icon: CheckSquare, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200', desc: 'Human action required' },
  { type: 'approval', label: 'Approval', icon: UserCheck, color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200', desc: 'Manager review' },
  { type: 'automated', label: 'Automated Step', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200', desc: 'System action' },
  { type: 'end', label: 'End Node', icon: Square, color: 'text-red-600', bg: 'bg-red-50 border-red-200', desc: 'Workflow completion' },
];

export const Sidebar: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full shadow-sm z-10">
      <div className="p-4 border-b border-slate-100">
        <h2 className="text-sm font-semibold tracking-wider text-slate-500 uppercase">Components</h2>
        <p className="text-xs text-slate-400 mt-1">Drag elements to canvas</p>
      </div>
      <div className="p-4 flex-1 overflow-y-auto space-y-3">
        {NODE_TYPES.map((nt) => {
          const Icon = nt.icon;
          return (
            <div
              key={nt.type}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-grab transition-colors hover:shadow-md ${nt.bg}`}
              onDragStart={(event) => onDragStart(event, nt.type)}
              draggable
            >
              <div className={`p-2 rounded shadow-sm bg-white ${nt.color}`}>
                <Icon size={16} />
              </div>
              <div>
                <div className="font-medium text-sm text-slate-700">{nt.label}</div>
                <div className="text-[11px] text-slate-500">{nt.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
