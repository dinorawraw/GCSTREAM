import React, { useEffect, useState } from 'react';
import type { LowerThird } from '../types';

const Live = () => {
  const [lowerThird, setLowerThird] = useState<LowerThird | null>(null);
  const [isVisible, setIsVisible] = useState(true);

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

    // Play animation on load
    setIsVisible(true);

    // Listen for keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Hide on ESC key
        handleHide();
      } else if (e.key === ' ' || e.key === 'Enter') {
        // Toggle on Space or Enter
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleHide = () => {
    setIsVisible(false);
  };

  if (!lowerThird) return null;

  const getTextStyles = () => {
    const { textStyle } = lowerThird;
    return {
      fontWeight: textStyle.bold ? 'bold' : 'normal',
      fontStyle: textStyle.italic ? 'italic' : 'normal',
      textAlign: textStyle.alignment,
      textTransform: textStyle.transform,
    };
  };

  const getAnimationClass = () => {
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

  if (!isVisible && !getAnimationClass().includes('out')) return null;

  return (
    <div className="fixed inset-0 bg-transparent">
      <div 
        className={`absolute bottom-8 left-8 flex items-center gap-4 ${getAnimationClass()}`}
        style={{
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
    </div>
  );
};

export default Live;