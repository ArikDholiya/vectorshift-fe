import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="p-4 bg-slate-50 border-b border-slate-200 shadow-sm">
            <div className="flex flex-wrap gap-4 items-center max-w-7xl mx-auto">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                {/* 5 New Nodes */}
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='api' label='API Fetch' />
                <DraggableNode type='condition' label='Condition' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='timer' label='Timer Delay' />
            </div>
        </div>
    );
};
