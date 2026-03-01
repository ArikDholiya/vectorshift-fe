import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ConditionNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      type="Condition"
      handles={[
        { type: 'target', position: Position.Left, id: 'input', style: { top: '50%' } },
        { type: 'source', position: Position.Right, id: 'true', style: { top: '33%' } },
        { type: 'source', position: Position.Right, id: 'false', style: { top: '66%' } }
      ]}
    >
      <div className="flex flex-col gap-2 items-center justify-center p-2">
         <span className="text-slate-600 font-medium whitespace-nowrap">If / Else</span>
      </div>
    </BaseNode>
  );
};
