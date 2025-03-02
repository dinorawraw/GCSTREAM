import React, { useState, useEffect } from 'react';
import type { LowerThird } from '../types';
import { Play, Pause, Eye, EyeOff, Settings, X, Move } from 'lucide-react';

const Preview = () => {
  const [lowerThird, setLowerThird] = useState<LowerThird | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const textStyle = JSON.parse(params.get('textStyle') || '{}');
    
    setLowerThird({
      tweetUrl: '',
      username: params.get('username') || '',
      content: params.get('content') || '',
      profilePicture: params.get('profilePicture') || '',
      textColor: params.get('textColor') || '#ffffff',
      borderColor: params.get('borderColor') || '#1d9bf0',
      boxColor: params.get('boxColor') || '#15202b',
      animation: params.get('animation') || 'slideIn',
      exitAnimation: params.get('exitAnimation') || 'slideOut',
      animationDuration: parseFloat(params.get('animationDuration') || '0.5'),
      exitDuration: parseFloat(params.get('exitDuration') || '0.5'),
      fontFamily: params.get('fontFamily') || 'Inter',
      fontSize: parseInt(params.get('fontSize') || '16', 10),
      textStyle: {
        bold: textStyle.bold || false,
        italic: textStyle.italic || false,
        alignment: textStyle.alignment || 'left',
        transform: textStyle.transform || 'none'
      }
    });

    // Listen for keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Toggle controls on ESC key
        setShowControls(prev => !prev);
      } else if (e.key === ' ' || e.key === 'Enter') {
        // Toggle visibility on Space or Enter
        setIsVisible(prev => !prev);
      } else if (e.key === 'h' || e.key === 'H') {
        // Hide controls on H key
        setShowControls(false);
      } else if (e.key === 's' || e.key === 'S') {
        // Show settings on S key
        setShowSettings(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getTextStyles = () => {
    if (!lowerThird) return {};
    const { textStyle } = lowerThird;
    return {
      fontWeight: textStyle.bold ? 'bold' : 'normal',
      fontStyle: textStyle.italic ? 'italic' : 'normal',
      textAlign: textStyle.alignment,
      textTransform: textStyle.transform,
    };
  };

  const getAnimationClass = () => {
    if (!lowerThird) return '';
    return isVisible 
      ? lowerThird.animation === 'slideIn' ? 'animate-slide-in' :
        lowerThird.animation === 'fadeIn' ? 'animate-fade-in' :
        lowerThird.animation === 'bounceIn' ? 'animate-bounce-in' :
        lowerThird.animation === 'scaleIn' ? 'animate-scale-in' : ''
      : lowerThird.exitAnimation === 'slideOut' ? 'animate-slide-out' :
        lowerThird.exitAnimation === 'fadeOut' ? 'animate-fade-out' :
        lowerThird.exitAnimation === 'bounceOut' ? 'animate-bounce-out' :
        lowerThird.exitAnimation === 'scaleOut' ? 'animate-scale-out' : '';
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ 
      x: e.clientX - position.x, 
      y: e.clientY - position.y 
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleMouseMove as unknown as EventListener);
    } else {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove as unknown as EventListener);
    }
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove as unknown as EventListener);
    };
  }, [isDragging, dragStart]);

  if (!lowerThird) return null;

  return (
    <div 
      className="fixed inset-0 bg-transparent"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Lower Third Content */}
      {(isVisible || getAnimationClass().includes('out')) && (
        <div 
          className={`absolute flex items-center gap-4 ${getAnimationClass()}`}
          style={{
            left: `${position.x}px`,
            bottom: `${position.y}px`,
            '--animation-duration': `${lowerThird.animationDuration}s`,
            '--exit-duration': `${lowerThird.exitDuration}s`
          } as React.CSSProperties}
        >
          <div className="flex flex-col items-center gap-1">
            <img
              src={lowerThird.profilePicture}
              alt="Profile"
              className="w-12 h-12 rounded-full border-2"
              style={{ borderColor: lowerThird.borderColor }}
            />
            {lowerThird.username && (
              <span
                className="text-sm font-medium"
                style={{ color: lowerThird.textColor }}
              >
                @{lowerThird.username}
              </span>
            )}
          </div>
          <div
            className="max-w-md rounded-lg p-4"
            style={{
              backgroundColor: lowerThird.boxColor,
              borderColor: lowerThird.borderColor,
              borderWidth: 2,
              color: lowerThird.textColor,
              fontFamily: lowerThird.fontFamily,
              fontSize: `${lowerThird.fontSize}px`,
              ...getTextStyles()
            }}
            dangerouslySetInnerHTML={{ __html: lowerThird.content }}
          />
        </div>
      )}

      {/* Controls */}
      {showControls && (
        <div className="fixed top-4 right-4 bg-gray-800/80 backdrop-blur-sm rounded-lg p-2 shadow-lg z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsVisible(!isVisible)}
              className={`p-2 rounded-md transition-colors ${
                isVisible ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
              }`}
              title={isVisible ? "Hide Lower Third" : "Show Lower Third"}
            >
              {isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
            
            <button
              onMouseDown={handleMouseDown}
              className="p-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors cursor-move"
              title="Drag to reposition"
            >
              <Move size={18} />
            </button>
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-md transition-colors ${
                showSettings ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-600 hover:bg-gray-700'
              }`}
              title="Settings"
            >
              <Settings size={18} />
            </button>
            
            <button
              onClick={() => setShowControls(false)}
              className="p-2 bg-gray-600 hover:bg-gray-700 rounded-md transition-colors"
              title="Hide Controls (Press ESC to show again)"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Settings Panel */}
          {showSettings && (
            <div className="mt-2 p-3 bg-gray-700 rounded-lg space-y-3">
              <div className="space-y-1">
                <label className="text-xs text-gray-300">Position</label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-xs">X:</span>
                    <input
                      type="number"
                      value={position.x}
                      onChange={(e) => setPosition({ ...position, x: parseInt(e.target.value) || 0 })}
                      className="w-full bg-gray-800 rounded px-2 py-1 text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs">Y:</span>
                    <input
                      type="number"
                      value={position.y}
                      onChange={(e) => setPosition({ ...position, y: parseInt(e.target.value) || 0 })}
                      className="w-full bg-gray-800 rounded px-2 py-1 text-sm"
                    />
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-gray-400">
                <p>Keyboard Shortcuts:</p>
                <ul className="mt-1 space-y-1">
                  <li>Space/Enter: Toggle visibility</li>
                  <li>ESC: Toggle controls</li>
                  <li>H: Hide controls</li>
                  <li>S: Toggle settings</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Preview;