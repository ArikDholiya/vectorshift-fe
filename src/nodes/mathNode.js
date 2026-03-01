import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const MathNode = ({ id }) => {
  const [operation, setOperation] = useState('add');

  return (
    <BaseNode
      id={id}
      type="Math"
      handles={[
        { type: 'target', position: Position.Left, id: 'a', style: { top: '33%' } },
        { type: 'target', position: Position.Left, id: 'b', style: { top: '66%' } },
        { type: 'source', position: Position.Right, id: 'result' }
      ]}
    >
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Operation
        </label>
        <select 
          value={operation} 
          onChange={(e) => setOperation(e.target.value)}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
        >
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (-)</option>
          <option value="multiply">Multiply (×)</option>
          <option value="divide">Divide (÷)</option>
        </select>
      </div>
    </BaseNode>
  );
};
