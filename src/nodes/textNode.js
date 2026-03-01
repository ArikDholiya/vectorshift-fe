import { useState, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Parse variables from text enclosed in {{ }}
  useEffect(() => {
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    let match;
    const foundVariables = [];
    while ((match = regex.exec(currText)) !== null) {
      if (!foundVariables.includes(match[1])) {
        foundVariables.push(match[1]);
      }
    }
    setVariables(foundVariables);
  }, [currText]);

  // Adjust textarea height dynamically
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Generate dynamic handles for variables
  const variableHandles = variables.map((variable, index) => ({
    type: 'target',
    position: Position.Left,
    id: variable,
    style: { top: `${((index + 1) / (variables.length + 1)) * 100}%` }
  }));

  const rightHandle = {
    type: 'source',
    position: Position.Right,
    id: 'output'
  };

  return (
    <BaseNode
      id={id}
      type="Text"
      handles={[...variableHandles, rightHandle]}
      className="min-h-[100px] w-auto max-w-[400px]"
    >
      <div className="flex flex-col gap-2 relative">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Text
        </label>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          className="w-full min-w-[200px] px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none overflow-hidden"
          rows={1}
        />
      </div>
    </BaseNode>
  );
};
