import React from 'react';
import { Play, Timer } from 'lucide-react';

interface AnimationSelectorProps {
  selected: string;
  exitSelected: string;
  duration: number;
  exitDuration: number;
  onSelect: (animation: string) => void;
  onExitSelect: (animation: string) => void;
  onDurationChange: (duration: number) => void;
  onExitDurationChange: (duration: number) => void;
}

const animations = [
  { id: 'slideIn', name: 'Slide In', exitId: 'slideOut', exitName: 'Slide Out' },
  { id: 'fadeIn', name: 'Fade In', exitId: 'fadeOut', exitName: 'Fade Out' },
  { id: 'bounceIn', name: 'Bounce In', exitId: 'bounceOut', exitName: 'Bounce Out' },
  { id: 'scaleIn', name: 'Scale In', exitId: 'scaleOut', exitName: 'Scale Out' },
];

const AnimationSelector: React.FC<AnimationSelectorProps> = ({
  selected,
  exitSelected,
  duration,
  exitDuration,
  onSelect,
  onExitSelect,
  onDurationChange,
  onExitDurationChange
}) => {
  return (
    <div className="bg-gray-700 rounded-lg p-4 space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Play size={16} className="text-blue-400" />
          Enter Animation
        </h3>
        <div className="space-y-2">
          {animations.map((animation) => (
            <button
              key={animation.id}
              onClick={() => onSelect(animation.id)}
              className={`w-full text-left px-4 py-2 rounded ${
                selected === animation.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            >
              {animation.name}
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Timer size={16} className="text-blue-400" />
          <span className="text-sm">Duration:</span>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={duration}
            onChange={(e) => onDurationChange(parseFloat(e.target.value))}
            className="flex-1"
          />
          <span className="text-sm font-mono w-16 text-right">{duration}s</span>
        </div>
      </div>

      <div className="border-t border-gray-600 pt-4">
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Play size={16} className="text-red-400 rotate-180" />
          Exit Animation
        </h3>
        <div className="space-y-2">
          {animations.map((animation) => (
            <button
              key={animation.exitId}
              onClick={() => onExitSelect(animation.exitId)}
              className={`w-full text-left px-4 py-2 rounded ${
                exitSelected === animation.exitId
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            >
              {animation.exitName}
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Timer size={16} className="text-red-400" />
          <span className="text-sm">Duration:</span>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={exitDuration}
            onChange={(e) => onExitDurationChange(parseFloat(e.target.value))}
            className="flex-1"
          />
          <span className="text-sm font-mono w-16 text-right">{exitDuration}s</span>
        </div>
      </div>
    </div>
  );
}

export default AnimationSelector;