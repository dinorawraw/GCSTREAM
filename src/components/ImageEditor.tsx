import React, { useState } from 'react';
import { Trash2, AlignLeft, AlignCenter, AlignRight, Maximize2, Minimize2 } from 'lucide-react';

interface ImageEditorProps {
  imageUrl: string;
  onUpdate: (newHtml: string) => void;
  onClose: () => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ imageUrl, onUpdate, onClose }) => {
  const [position, setPosition] = useState<'left' | 'center' | 'right'>('center');
  const [width, setWidth] = useState(100);

  const updateImage = () => {
    const style = `
      max-width: ${width}%;
      border-radius: 8px;
      display: block;
      ${position === 'center' ? 'margin-left: auto; margin-right: auto;' : ''}
      ${position === 'right' ? 'margin-left: auto;' : ''}
    `;
    const newHtml = `<img src="${imageUrl}" alt="Inserted image" style="${style}" />`;
    onUpdate(newHtml);
  };

  const handleDelete = () => {
    onUpdate('');
    onClose();
  };

  const adjustWidth = (increase: boolean) => {
    setWidth(prev => Math.min(100, Math.max(20, prev + (increase ? 10 : -10))));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Edit Image</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900 rounded-lg p-4 flex items-center justify-center min-h-[200px] relative">
            <div className="w-full overflow-hidden">
              <img
                src={imageUrl}
                alt="Preview"
                style={{
                  maxWidth: `${width}%`,
                  borderRadius: '8px',
                  display: 'block',
                  marginLeft: position === 'center' ? 'auto' : position === 'right' ? 'auto' : '0',
                  marginRight: position === 'center' ? 'auto' : position === 'right' ? '0' : 'auto',
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Width Controls */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-300">Width</h4>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => adjustWidth(false)}
                  className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                  title="Decrease Width"
                >
                  <Minimize2 size={18} />
                </button>
                <div className="bg-gray-700 px-3 py-1.5 rounded-full min-w-[70px] text-center text-sm">
                  {width}%
                </div>
                <button
                  onClick={() => adjustWidth(true)}
                  className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                  title="Increase Width"
                >
                  <Maximize2 size={18} />
                </button>
              </div>
            </div>

            {/* Alignment Controls */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-300">Alignment</h4>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setPosition('left')}
                  className={`p-2 rounded-md transition-colors ${
                    position === 'left' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  title="Align Left"
                >
                  <AlignLeft size={18} />
                </button>
                <button
                  onClick={() => setPosition('center')}
                  className={`p-2 rounded-md transition-colors ${
                    position === 'center' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  title="Align Center"
                >
                  <AlignCenter size={18} />
                </button>
                <button
                  onClick={() => setPosition('right')}
                  className={`p-2 rounded-md transition-colors ${
                    position === 'right' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  title="Align Right"
                >
                  <AlignRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <div className="flex justify-between gap-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md flex items-center gap-2 transition-colors"
              >
                <Trash2 size={18} />
                Delete Image
              </button>
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    updateImage();
                    onClose();
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  Apply Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;