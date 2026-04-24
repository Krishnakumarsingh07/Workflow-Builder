import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import { Play, CheckSquare, UserCheck, Zap, Square } from 'lucide-react';
import clsx from 'clsx';

const NodeWrapper = ({ children, selected, title, icon: Icon, colorClass, borderClass }: any) => (
  <div className={clsx(
    "relative min-w-[140px] bg-white rounded-md shadow-sm border transition-all duration-200",
    selected ? `border-blue-500 ring-1 ring-blue-500` : `border-slate-200 hover:border-slate-300`
  )}>
    <div className={clsx("flex items-center justify-between p-2 rounded-t-md border-b border-slate-100", colorClass)}>
      <div className="flex items-center gap-1.5 text-slate-700">
        <Icon size={14} className={borderClass} />
        <span className="font-semibold text-[11px] uppercase tracking-wide">{title}</span>
      </div>
    </div>
    <div className="p-2 text-slate-600 text-[10px] leading-tight bg-white rounded-b-md">
      {children}
    </div>
  </div>
);

export const StartNode = memo(({ data, selected }: NodeProps) => (
  <>
    <NodeWrapper selected={selected} title={data.title || 'Start Node'} icon={Play} colorClass="bg-green-50" borderClass="text-green-600">
      <div className="text-slate-500">Entry Point</div>
    </NodeWrapper>
    <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-green-500 !border-white" />
  </>
));

export const TaskNode = memo(({ data, selected }: NodeProps) => (
  <>
    <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-blue-500 !border-white" />
    <NodeWrapper selected={selected} title={data.title || 'Manual Task'} icon={CheckSquare} colorClass="bg-blue-50" borderClass="text-blue-600">
      <div className="flex flex-col gap-1">
        <div className="font-medium text-slate-800 truncate">{data.assignee || 'Unassigned'}</div>
        {data.dueDate && <div className="text-slate-400">Due: {data.dueDate}</div>}
      </div>
    </NodeWrapper>
    <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-blue-500 !border-white" />
  </>
));

export const ApprovalNode = memo(({ data, selected }: NodeProps) => (
  <>
    <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-orange-500 !border-white" />
    <NodeWrapper selected={selected} title={data.title || 'Approval Gate'} icon={UserCheck} colorClass="bg-orange-50" borderClass="text-orange-600">
      <div className="font-medium text-slate-800">{data.approverRole || 'Manager'}</div>
    </NodeWrapper>
    <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-orange-500 !border-white" />
  </>
));

export const AutomatedNode = memo(({ data, selected }: NodeProps) => (
  <>
    <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-purple-500 !border-white" />
    <NodeWrapper selected={selected} title={data.title || 'Automated Step'} icon={Zap} colorClass="bg-purple-50" borderClass="text-purple-600">
      <div className="font-medium text-slate-800 truncate">{data.action || 'None selected'}</div>
    </NodeWrapper>
    <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-purple-500 !border-white" />
  </>
));

export const EndNode = memo(({ data, selected }: NodeProps) => (
  <>
    <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-red-500 !border-white" />
    <NodeWrapper selected={selected} title={data.title || 'End Node'} icon={Square} colorClass="bg-red-50" borderClass="text-red-600">
      <div className="text-slate-500 truncate">{data.message || 'Workflow terminates'}</div>
    </NodeWrapper>
  </>
));
