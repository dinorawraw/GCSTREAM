import React from 'react';
import { X, Check, Type } from 'lucide-react';

interface FontSelectorProps {
  selected: string;
  onSelect: (font: string) => void;
  onClose: () => void;
}

const fonts = [
  { id: 'Inter', name: 'Inter' },
  { id: 'Roboto', name: 'Roboto' },
  { id: 'Open Sans', name: 'Open Sans' },
  { id: 'Montserrat', name: 'Montserrat' },
  { id: 'Poppins', name: 'Poppins' },
  { id: 'Playfair Display', name: 'Playfair Display' },
];

const FontSelector: React.FC<FontSelectorProps> = ({ selected, onSelect, onClose }) => {
  return (
    <div className="absolute bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 w-64">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Type size={16} className="text-blue-400" />
          Select Font
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      <div className="space-y-1">
        {fonts.map((font) => (
          <button
            key={font.id}
            onClick={() => onSelect(font.id)}
            className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between transition-colors ${
              selected === font.id
                ? 'bg-blue-500/20 text-blue-400'
                : 'hover:bg-gray-700/50'
            }`}
          >
            <span style={{ fontFamily: font.id }}>{font.name}</span>
            {selected === font.id && <Check size={16} className="text-blue-400" />}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FontSelector;