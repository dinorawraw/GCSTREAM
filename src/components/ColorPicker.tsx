import React from 'react';
import { X } from 'lucide-react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  onClose: () => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange, onClose }) => {
  return (
    <div className="absolute bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">Pick a Color</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <X size={18} />
        </button>
      </div>
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 rounded cursor-pointer"
      />
    </div>
  );
}

export default ColorPicker;