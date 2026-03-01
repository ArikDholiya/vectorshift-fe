import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id }) => {
  const [transformType, setTransformType] = useState('jsonToCsv');

  return (
    <BaseNode
      id={id}
      type="Transform"
      handles={[
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'output' }
      ]}
    >
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Format
        </label>
        <select 
          value={transformType} 
          onChange={(e) => setTransformType(e.target.value)}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
        >
          <option value="jsonToCsv">JSON to CSV</option>
          <option value="csvToJson">CSV to JSON</option>
          <option value="xmlToJson">XML to JSON</option>
        </select>
      </div>
    </BaseNode>
  );
};
