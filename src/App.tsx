import React, { useState, useRef } from 'react';
import { Link2, Eye, Send, Palette, Image, Type, Minus, Plus, Play, ExternalLink, Pencil, Square, AtSign, Upload } from 'lucide-react';
import { createWorker } from 'tesseract.js';
import ColorPicker from './components/ColorPicker';
import AnimationSelector from './components/AnimationSelector';
import FontSelector from './components/FontSelector';
import TextStyleControls from './components/TextStyleControls';
import Preview from './components/Preview';
import LivePreview from './components/LivePreview';
import ImageEditor from './components/ImageEditor';
import type { LowerThird } from './types';

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [lowerThird, setLowerThird] = useState<LowerThird>({
    tweetUrl: '',
    profilePicture: 'https://instagram.fcgh10-2.fna.fbcdn.net/v/t51.29350-15/328424707_1949459538764487_4241318912349984248_n.webp?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi45MzZ4MTE3MC5zZHIuZjI5MzUwLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fcgh10-2.fna.fbcdn.net&_nc_cat=103&_nc_ohc=y5vsl5rxy8QQ7kNvgGqi_fd&_nc_gid=9105dce1f52f4e8cbc94757a5fb5b237&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzA4MTE5ODEwMDAxMDE2NDA2OQ%3D%3D.3-ccb7-5&oh=00_AYC75Oc_OhBOkFPaT6vRnFkDGwJ74MY_bTJeH_S9aGPCgg&oe=679C4970&_nc_sid=7a9f4b',
    username: '',
    content: 'Sample tweet content will appear here...',
    textColor: '#ffffff',
    borderColor: '#1d9bf0',
    boxColor: '#15202b',
    animation: 'slideIn',
    exitAnimation: 'slideOut',
    animationDuration: 0.5,
    exitDuration: 0.5,
    fontFamily: 'Inter',
    fontSize: 16,
    textStyle: {
      bold: false,
      italic: false,
      alignment: 'left',
      transform: 'none'
    }
  });

  const [showColorPicker, setShowColorPicker] = useState<string | null>(null);
  const [showAnimations, setShowAnimations] = useState(false);
  const [showFontSelector, setShowFontSelector] = useState(false);
  const [showProfilePictureInput, setShowProfilePictureInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showImageEditor, setShowImageEditor] = useState<string | null>(null);

  const handleCapture = async () => {
    if (!lowerThird.tweetUrl) {
      alert('Please enter a tweet URL');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/tweet-scraper?url=${encodeURIComponent(lowerThird.tweetUrl)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tweet');
      }
      const data = await response.json();
      
      setLowerThird(prev => ({
        ...prev,
        content: data.content,
        profilePicture: data.profilePicture || prev.profilePicture
      }));
    } catch (error) {
      console.error('Error processing tweet:', error);
      alert('Failed to extract tweet content. Please try again or paste the content manually.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpdate = (newHtml: string) => {
    setLowerThird(prev => ({
      ...prev,
      content: newHtml || 'Sample tweet content will appear here...'
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setShowImageEditor(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const extractImageUrl = (content: string): string | null => {
    const match = content.match(/src="([^"]+)"/);
    return match ? match[1] : null;
  };

  const getLiveUrl = () => {
    const params = new URLSearchParams({
      content: lowerThird.content,
      username: lowerThird.username,
      profilePicture: lowerThird.profilePicture,
      textColor: lowerThird.textColor,
      borderColor: lowerThird.borderColor,
      boxColor: lowerThird.boxColor,
      animation: lowerThird.animation,
      exitAnimation: lowerThird.exitAnimation,
      animationDuration: lowerThird.animationDuration.toString(),
      exitDuration: lowerThird.exitDuration.toString(),
      fontFamily: lowerThird.fontFamily,
      fontSize: lowerThird.fontSize.toString(),
      textStyle: JSON.stringify(lowerThird.textStyle)
    });
    return `/live?${params.toString()}`;
  };

  const getPreviewUrl = () => {
    const params = new URLSearchParams({
      content: lowerThird.content,
      username: lowerThird.username,
      profilePicture: lowerThird.profilePicture,
      textColor: lowerThird.textColor,
      borderColor: lowerThird.borderColor,
      boxColor: lowerThird.boxColor,
      animation: lowerThird.animation,
      exitAnimation: lowerThird.exitAnimation,
      animationDuration: lowerThird.animationDuration.toString(),
      exitDuration: lowerThird.exitDuration.toString(),
      fontFamily: lowerThird.fontFamily,
      fontSize: lowerThird.fontSize.toString(),
      textStyle: JSON.stringify(lowerThird.textStyle)
    });
    return `/preview?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#04456c] via-[#391334] to-[#04244c] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          GC para Streams
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Control Panel */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 space-y-6">
            {/* Tweet Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Tweet URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={lowerThird.tweetUrl}
                  onChange={(e) => setLowerThird({ ...lowerThird, tweetUrl: e.target.value })}
                  className="flex-1 bg-gray-700 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="https://twitter.com/user/status/123456789"
                />
                <button
                  onClick={handleCapture}
                  disabled={isLoading}
                  className={`bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  ) : (
                    <Link2 size={18} />
                  )}
                  {isLoading ? 'Processing...' : 'Capture'}
                </button>
              </div>
            </div>

            {/* Username Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Username</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <AtSign size={18} />
                  </span>
                  <input
                    type="text"
                    value={lowerThird.username}
                    onChange={(e) => setLowerThird({ ...lowerThird, username: e.target.value })}
                    className="w-full bg-gray-700 rounded px-4 py-2 pl-10 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="username"
                  />
                </div>
              </div>
            </div>

            {/* Profile Picture */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium">Profile Picture</label>
                <button
                  onClick={() => setShowProfilePictureInput(!showProfilePictureInput)}
                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                >
                  <Image size={16} /> Change Picture
                </button>
              </div>
              {showProfilePictureInput && (
                <input
                  type="url"
                  value={lowerThird.profilePicture}
                  onChange={(e) => setLowerThird({ ...lowerThird, profilePicture: e.target.value })}
                  className="w-full bg-gray-700 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="https://example.com/profile-picture.jpg"
                />
              )}
              <div className="flex items-center gap-2">
                <img
                  src={lowerThird.profilePicture}
                  alt="Profile"
                  className="w-12 h-12 rounded-full border-2"
                  style={{ borderColor: lowerThird.borderColor }}
                />
                <span className="text-sm text-gray-400">Current profile picture</span>
              </div>
            </div>

            {/* Content Editor */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Content</label>
              <div className="flex gap-2">
                <textarea
                  value={lowerThird.content}
                  onChange={(e) => setLowerThird({ ...lowerThird, content: e.target.value })}
                  className="flex-1 bg-gray-700 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none h-24"
                />
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      const imageUrl = extractImageUrl(lowerThird.content);
                      if (imageUrl) {
                        setShowImageEditor(imageUrl);
                      }
                    }}
                    className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded flex items-center gap-2"
                  >
                    <Pencil size={18} /> Edit
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded flex items-center gap-2"
                  >
                    <Upload size={18} /> Upload
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Font Controls */}
            <div className="relative">
              <div
                onClick={() => setShowFontSelector(!showFontSelector)}
                className="w-full bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded flex items-center gap-2 justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Type size={18} />
                  <span style={{ fontFamily: lowerThird.fontFamily }}>
                    {lowerThird.fontFamily}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLowerThird(prev => ({
                          ...prev,
                          fontSize: Math.max(12, prev.fontSize - 1)
                        }));
                      }}
                      className="p-1 hover:bg-gray-500 rounded"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center">{lowerThird.fontSize}px</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLowerThird(prev => ({
                          ...prev,
                          fontSize: Math.min(32, prev.fontSize + 1)
                        }));
                      }}
                      className="p-1 hover:bg-gray-500 rounded"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
              {showFontSelector && (
                <FontSelector
                  selected={lowerThird.fontFamily}
                  onSelect={(font) => {
                    setLowerThird({ ...lowerThird, fontFamily: font });
                    setShowFontSelector(false);
                  }}
                  onClose={() => setShowFontSelector(false)}
                />
              )}
            </div>

            {/* Text Style Controls */}
            <TextStyleControls
              textStyle={lowerThird.textStyle}
              onChange={(newStyle) => setLowerThird({ ...lowerThird, textStyle: newStyle })}
            />

            {/* Style Controls */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setShowColorPicker('text')}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded flex items-center gap-2 justify-center"
              >
                <Palette size={18} /> Text Color
              </button>
              <button
                onClick={() => setShowColorPicker('border')}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded flex items-center gap-2 justify-center"
              >
                <Palette size={18} /> Border Color
              </button>
              <button
                onClick={() => setShowAnimations(!showAnimations)}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded flex items-center gap-2 justify-center col-span-2"
              >
                <Eye size={18} /> Animations
              </button>
            </div>

            {showColorPicker && (
              <ColorPicker
                color={lowerThird[`${showColorPicker}Color` as keyof LowerThird] as string}
                onChange={(color) => {
                  setLowerThird({ ...lowerThird, [`${showColorPicker}Color`]: color });
                }}
                onClose={() => setShowColorPicker(null)}
              />
            )}

            {showAnimations && (
              <AnimationSelector
                selected={lowerThird.animation}
                exitSelected={lowerThird.exitAnimation}
                duration={lowerThird.animationDuration}
                exitDuration={lowerThird.exitDuration}
                onSelect={(animation) => setLowerThird({ ...lowerThird, animation })}
                onExitSelect={(exitAnimation) => setLowerThird({ ...lowerThird, exitAnimation })}
                onDurationChange={(duration) => setLowerThird({ ...lowerThird, animationDuration: duration })}
                onExitDurationChange={(exitDuration) => setLowerThird({ ...lowerThird, exitDuration: exitDuration })}
              />
            )}
          </div>

          {/* Preview Panel */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 flex flex-col gap-6">
            {/* Preview Section */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <div className="h-[350px]">
                <Preview lowerThird={lowerThird} />
              </div>
            </div>
            
            {/* Live Preview Section */}
            <div className="flex-1 border-t border-gray-700 pt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Eye className="text-blue-400" />
                Live Preview
              </h2>
              
              <div className="bg-gray-900/50 rounded-lg p-4">
                <div className="aspect-video bg-[url('/grid.png')] bg-center relative overflow-hidden rounded-lg mb-4 h-[250px]">
                  <LivePreview lowerThird={lowerThird} isPlaying={isPlaying} />
                </div>
                
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`flex-1 px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-colors ${
                      isPlaying
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    <Play size={18} />
                    {isPlaying ? 'Stop' : 'Play Animation'}
                  </button>
                  
                  <div className="flex gap-2">
                    <a
                      href={getLiveUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md flex items-center gap-2 transition-colors"
                    >
                      <ExternalLink size={18} />
                      Live View
                    </a>
                    
                    <a
                      href={getPreviewUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-md flex items-center gap-2 transition-colors"
                    >
                      <ExternalLink size={18} />
                      OBS View
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showImageEditor && (
        <ImageEditor
          imageUrl={showImageEditor}
          onUpdate={handleImageUpdate}
          onClose={() => setShowImageEditor(null)}
        />
      )}
    </div>
  );
}

export default App;