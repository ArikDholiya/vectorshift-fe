import { Handle } from 'reactflow';

export const BaseNode = ({
  id,
  type = 'Node',
  handles = [],
  children,
  style = {},
  className = '',
}) => {
  return (
    <div
      className={`relative w-64 rounded-xl border-2 border-slate-300 bg-white shadow-md hover:border-violet-500 hover:shadow-lg transition-all duration-300 ease-in-out ${className}`}
      style={style}
    >
      {/* Dynamic Handles */}
      {handles.map((handle, index) => (
        <Handle
          key={`${id}-${handle.id}-${index}`}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={handle.style || {}}
          className={`w-3 h-3 ${handle.type === 'source' ? 'bg-violet-500' : 'bg-emerald-400'} border-white border-2`}
        />
      ))}

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-200 rounded-t-xl">
        <span className="text-sm font-semibold text-slate-700 tracking-wide">
          {type}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        {children}
      </div>
    </div>
  );
};
