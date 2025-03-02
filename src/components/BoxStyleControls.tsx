import React from 'react';
import { Square, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Minus, Plus, CornerUpLeft } from 'lucide-react';

interface BoxStyleControlsProps {
  boxStyle: {
    padding: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
    borderWidth: number;
    borderRadius: number;
  };
  onChange: (newStyle: any) => void;
}

const BoxStyleControls: React.FC<BoxStyleControlsProps> = ({ boxStyle, onChange }) => {
  const adjustPadding = (direction: 'top' | 'right' | 'bottom' | 'left', value: number) => {
    onChange({
      ...boxStyle,
      padding: {
        ...boxStyle.padding,
        [direction]: Math.max(0, boxStyle.padding[direction] + value)
      }
    });
  };

  const adjustBorderWidth = (increase: boolean) => {
    onChange({
      ...boxStyle,
      borderWidth: Math.max(0, boxStyle.borderWidth + (increase ? 1 : -1))
    });
  };

  const adjustBorderRadius = (increase: boolean) => {
    onChange({
      ...boxStyle,
      borderRadius: Math.max(0, boxStyle.borderRadius + (increase ? 1 : -1))
    });
  };

  return (
    <div className="bg-gray-700/50 rounded-lg p-4 space-y-6">
      <div className="flex items-center gap-2">
        <Square size={18} className="text-blue-400" />
        <h3 className="text-sm font-medium">Box Style</h3>
      </div>

      {/* Padding Controls */}
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-gray-400">Padding</h4>
        <div className="grid grid-cols-3 gap-2 items-center justify-items-center">
          <div />
          <button
            onClick={() => adjustPadding('top', -1)}
            className="p-2 bg-gray-600 rounded-md hover:bg-gray-500 transition-colors"
          >
            <ArrowUp size={16} />
          </button>
          <div />
          
          <button
            onClick={() => adjustPadding('left', -1)}
            className="p-2 bg-gray-600 rounded-md hover:bg-gray-500 transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="text-sm bg-gray-600 px-3 py-1.5 rounded-md grid grid-cols-2 gap-x-2 gap-y-1 min-w-[80px]">
            <span className="text-center">{boxStyle.padding.top}</span>
            <span className="text-center">{boxStyle.padding.right}</span>
            <span className="text-center">{boxStyle.padding.bottom}</span>
            <span className="text-center">{boxStyle.padding.left}</span>
          </div>
          <button
            onClick={() => adjustPadding('right', -1)}
            className="p-2 bg-gray-600 rounded-md hover:bg-gray-500 transition-colors"
          >
            <ArrowRight size={16} />
          </button>
          
          <div />
          <button
            onClick={() => adjustPadding('bottom', -1)}
            className="p-2 bg-gray-600 rounded-md hover:bg-gray-500 transition-colors"
          >
            <ArrowDown size={16} />
          </button>
          <div />
        </div>
      </div>

      {/* Border Width */}
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-gray-400">Border Width</h4>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => adjustBorderWidth(false)}
            className="p-2 bg-gray-600 rounded-md hover:bg-gray-500 transition-colors"
          >
            <Minus size={16} />
          </button>
          <div className="bg-gray-600 px-3 py-1.5 rounded-md min-w-[60px] text-center">
            {boxStyle.borderWidth}px
          </div>
          <button
            onClick={() => adjustBorderWidth(true)}
            className="p-2 bg-gray-600 rounded-md hover:bg-gray-500 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Border Radius */}
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-gray-400">Border Radius</h4>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => adjustBorderRadius(false)}
            className="p-2 bg-gray-600 rounded-md hover:bg-gray-500 transition-colors"
          >
            <Minus size={16} />
          </button>
          <div className="bg-gray-600 px-3 py-1.5 rounded-md min-w-[60px] text-center">
            {boxStyle.borderRadius}px
          </div>
          <button
            onClick={() => adjustBorderRadius(true)}
            className="p-2 bg-gray-600 rounded-md hover:bg-gray-500 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoxStyleControls;