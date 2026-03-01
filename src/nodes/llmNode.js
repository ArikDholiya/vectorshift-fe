import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      type="LLM"
      handles={[
        { type: 'target', position: Position.Left, id: 'system', style: { top: `${100/3}%` } },
        { type: 'target', position: Position.Left, id: 'prompt', style: { top: `${200/3}%` } },
        { type: 'source', position: Position.Right, id: 'response' }
      ]}
    >
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-700">This is a LLM.</span>
      </div>
    </BaseNode>
  );
};
