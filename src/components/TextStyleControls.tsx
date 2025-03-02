import React from 'react';
import { Bold, Italic, AlignLeft, AlignCenter, AlignRight, Type } from 'lucide-react';

interface TextStyleControlsProps {
  textStyle: {
    bold: boolean;
    italic: boolean;
    alignment: 'left' | 'center' | 'right';
    transform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  };
  onChange: (style: any) => void;
}

const TextStyleControls: React.FC<TextStyleControlsProps> = ({ textStyle, onChange }) => {
  const transformOptions = [
    { value: 'none', label: 'Aa' },
    { value: 'uppercase', label: 'AA' },
    { value: 'lowercase', label: 'aa' },
    { value: 'capitalize', label: 'Aa' },
  ];

  return (
    <div className="bg-gray-700/50 rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Type size={18} className="text-blue-400" />
        <h3 className="text-sm font-medium">Text Style</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onChange({ ...textStyle, bold: !textStyle.bold })}
          className={`p-2 rounded-md transition-colors ${
            textStyle.bold ? 'bg-blue-500 text-white' : 'bg-gray-600 hover:bg-gray-500'
          }`}
          title="Bold"
        >
          <Bold size={18} />
        </button>
        
        <button
          onClick={() => onChange({ ...textStyle, italic: !textStyle.italic })}
          className={`p-2 rounded-md transition-colors ${
            textStyle.italic ? 'bg-blue-500 text-white' : 'bg-gray-600 hover:bg-gray-500'
          }`}
          title="Italic"
        >
          <Italic size={18} />
        </button>

        <div className="w-px h-8 bg-gray-600 mx-1" />
        
        <button
          onClick={() => onChange({ ...textStyle, alignment: 'left' })}
          className={`p-2 rounded-md transition-colors ${
            textStyle.alignment === 'left' ? 'bg-blue-500 text-white' : 'bg-gray-600 hover:bg-gray-500'
          }`}
          title="Align Left"
        >
          <AlignLeft size={18} />
        </button>
        
        <button
          onClick={() => onChange({ ...textStyle, alignment: 'center' })}
          className={`p-2 rounded-md transition-colors ${
            textStyle.alignment === 'center' ? 'bg-blue-500 text-white' : 'bg-gray-600 hover:bg-gray-500'
          }`}
          title="Align Center"
        >
          <AlignCenter size={18} />
        </button>
        
        <button
          onClick={() => onChange({ ...textStyle, alignment: 'right' })}
          className={`p-2 rounded-md transition-colors ${
            textStyle.alignment === 'right' ? 'bg-blue-500 text-white' : 'bg-gray-600 hover:bg-gray-500'
          }`}
          title="Align Right"
        >
          <AlignRight size={18} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-300">Case:</span>
        <div className="flex gap-1">
          {transformOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange({ ...textStyle, transform: option.value })}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                textStyle.transform === option.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              title={option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextStyleControls;