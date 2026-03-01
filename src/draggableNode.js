// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={`${type} cursor-grab min-w-[80px] h-[60px] flex items-center justify-center flex-col bg-white border border-slate-200 rounded-xl shadow-sm text-slate-700 font-medium hover:shadow-md hover:border-violet-500 hover:text-violet-600 transition-all duration-200 px-4 py-2 select-none`}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
          <span className="text-sm">{label}</span>
      </div>
    );
};
  