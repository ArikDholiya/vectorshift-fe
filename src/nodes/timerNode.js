import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TimerNode = ({ id }) => {
  const [delay, setDelay] = useState(1);

  return (  
    <BaseNode
      id={id}
      type="Timer Delay"
      handles={[
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'output' }
      ]}
    >
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Delay (Seconds)
        </label>
        <div className="flex items-center gap-2">
           <input 
             type="range" 
             min="1" 
             max="60" 
             value={delay} 
             onChange={(e) => setDelay(e.target.value)} 
             className="flex-grow accent-violet-500"
           />
           <span className="text-sm font-medium text-slate-700 font-mono w-8 text-right">
             {delay}s
           </span>
        </div>
      </div>
    </BaseNode>
  );
};
