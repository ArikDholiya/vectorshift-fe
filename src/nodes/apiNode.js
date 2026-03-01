import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ApiNode = ({ id }) => {
  const [endpoint, setEndpoint] = useState('https://api.example.com/data');
  const [method, setMethod] = useState('GET');

  return (
    <BaseNode
      id={id}
      type="API Fetch"
      handles={[
        { type: 'target', position: Position.Left, id: 'trigger', style: { top: '50%' } },
        { type: 'source', position: Position.Right, id: 'response', style: { top: '33%' } },
        { type: 'source', position: Position.Right, id: 'error', style: { top: '66%' } }
      ]}
    >
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Endpoint
        </label>
        <input 
          type="text" 
          value={endpoint} 
          onChange={(e) => setEndpoint(e.target.value)} 
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all block"
        />
        
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
          Method
        </label>
        <select 
          value={method} 
          onChange={(e) => setMethod(e.target.value)}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
    </BaseNode>
  );
};
