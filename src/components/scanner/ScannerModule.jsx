import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Camera, RefreshCw, Check, Scissors } from 'lucide-react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from '../ui/Button'; // Adjusted path
import { useLanguage } from '../../contexts/LanguageContext';

export const ScannerModule = ({ 
  isOpen, 
  onClose, 
  onCapture, 
  onDetected,
  isProcessing,
  videoRef,
  canvasRef,
  stream,
  processOCROnCrop,
  // New props for pro features
  facingMode,
  zoom,
  exposure,
  resolutionInfo,
  toggleFacingMode,
  updateConstraint
}) => {
  const { lang } = useLanguage();
  const [capturedImage, setCapturedImage] = useState(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();

  useEffect(() => {
    if (isOpen && stream && videoRef.current && !capturedImage) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(e => console.log("Play error:", e));
    }
    if (!isOpen) {
      setCapturedImage(null);
      setCrop(undefined);
    }
  }, [isOpen, stream, videoRef, capturedImage]);

  const handleLiveCapture = async () => {
    const dataUrl = await onCapture();
    if (dataUrl) {
      setCapturedImage(dataUrl);
      setCrop({
        unit: '%',
        x: 25,
        y: 35,
        width: 50,
        height: 30
      });
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setCrop(undefined);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black flex flex-col overflow-hidden"
        >
          {/* Pro Header / HUD */}
          <div className="absolute top-0 inset-x-0 p-4 flex justify-between items-start z-50 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest">
                        {lang === 'ar' ? 'البث المباشر' : 'REC • LIVE'}
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-[9px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-sm border border-indigo-500/20">
                        {resolutionInfo.width}x{resolutionInfo.height}
                    </span>
                    <span className="text-[9px] font-mono text-white/50 uppercase">
                        {facingMode === 'environment' ? 'BACK' : 'FRONT'}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={toggleFacingMode} 
                    className="bg-white/5 hover:bg-white/10 text-white rounded-full w-10 h-10 p-0 border border-white/10"
                >
                    <RefreshCw size={18} />
                </Button>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={onClose} 
                    className="bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 p-0"
                >
                    <X size={20} />
                </Button>
            </div>
          </div>

          {/* Viewfinder Area */}
          <div className="relative flex-grow flex items-center justify-center bg-neutral-900 overflow-hidden">
            {!capturedImage ? (
              <>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover" 
                />
                
                {/* 3x3 Grid Overlay */}
                <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 opacity-20">
                    <div className="border-r border-b border-white/30" />
                    <div className="border-r border-b border-white/30" />
                    <div className="border-b border-white/30" />
                    <div className="border-r border-b border-white/30" />
                    <div className="border-r border-b border-white/30" />
                    <div className="border-b border-white/30" />
                    <div className="border-r border-white/30" />
                    <div className="border-r border-white/30" />
                    <div className="border-white/30" />
                </div>

                {/* Central Focus Guide */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-8">
                  <div className="relative w-full max-w-sm aspect-[4/3] border border-white/10 rounded-[2rem]">
                    <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-indigo-500/50 rounded-tl-lg" />
                    <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-indigo-500/50 rounded-tr-lg" />
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-indigo-500/50 rounded-bl-lg" />
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-indigo-500/50 rounded-br-lg" />
                    
                    {/* Level Indicator */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-[1px] bg-white/30" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-[1px] bg-white/30" />
                  </div>
                </div>

                {/* Vertical Zoom Slider (Right Side) */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-40 bg-black/30 backdrop-blur-md p-3 rounded-full border border-white/10">
                    <span className="text-[8px] font-black text-white/50 uppercase tracking-tighter">Zoom</span>
                    <input 
                        type="range"
                        min="1"
                        max="5"
                        step="0.1"
                        value={zoom}
                        onChange={(e) => updateConstraint('zoom', parseFloat(e.target.value))}
                        className="h-32 accent-indigo-500 cursor-pointer"
                        style={{ appearance: 'slider-vertical' }}
                    />
                    <span className="text-[10px] font-mono text-white/70">{zoom.toFixed(1)}x</span>
                </div>
              </>
            ) : (
              <div className="relative w-full h-full flex flex-col items-center justify-center bg-black/90 p-4">
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  className="max-h-[75vh] border-2 border-indigo-500/30 rounded-lg overflow-hidden"
                >
                  <img src={capturedImage} alt="Capture" className="max-w-full max-h-[75vh]" />
                </ReactCrop>
                
                <div className="mt-4 text-center">
                  <p className="text-white/50 text-[10px] font-mono uppercase tracking-[0.2em]">
                    {lang === 'ar' ? 'حدد الرمز المسح' : 'CROP AREA FOR PRECISION OCR'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Controls Footer */}
          <div className="h-40 bg-black border-t border-white/5 flex items-center justify-center px-10">
            {!capturedImage ? (
              <div className="w-full flex justify-between items-center max-w-sm">
                {/* Visual Placeholder for Balance */}
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center opacity-50">
                    <Scissors size={18} className="text-white" />
                </div>

                {/* Capture Button */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleLiveCapture}
                  disabled={isProcessing}
                  className={`relative w-24 h-24 rounded-full flex items-center justify-center p-1 border-4 border-white/20 ${
                    isProcessing ? 'opacity-50' : 'hover:border-white/40'
                  }`}
                >
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center shadow-2xl">
                    {isProcessing ? (
                        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <div className="w-16 h-16 rounded-full border-2 border-black/10" />
                    )}
                  </div>
                </motion.button>

                {/* Exposure Control (Simplified Toggle or Placeholder) */}
                <div className="flex flex-col items-center gap-1 opacity-50">
                    <Target size={20} className="text-white" />
                    <span className="text-[8px] font-mono text-white/50">AUTO</span>
                </div>
              </div>
            ) : (
              <div className="flex gap-16 items-center">
                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={handleRetake}
                    className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                  >
                    <RefreshCw size={20} />
                  </button>
                  <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">{lang === 'ar' ? 'إعادة' : 'RETAKE'}</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={async () => {
                      if (!completedCrop) return;
                      const code = await processOCROnCrop(capturedImage, completedCrop);
                      if (code) {
                        onDetected(code);
                        onClose();
                      }
                    }}
                    disabled={isProcessing}
                    className={`w-28 h-28 rounded-full flex items-center justify-center transition-all bg-indigo-600 shadow-[0_0_50px_rgba(79,70,229,0.3)] ${
                      isProcessing ? 'opacity-50' : 'hover:scale-105 active:scale-95'
                    }`}
                  >
                    {isProcessing ? (
                      <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Check size={36} className="text-white" />
                    )}
                  </motion.button>
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
                    {isProcessing ? (lang === 'ar' ? 'جاري التحليل...' : 'ANALYZING...') : (lang === 'ar' ? 'تاكيد المسح' : 'CONFIRM SCAN')}
                  </span>
                </div>
              </div>
            )}
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
