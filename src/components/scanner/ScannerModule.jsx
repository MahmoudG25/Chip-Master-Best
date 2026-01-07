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
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          {/* Mobile HUD - Top */}
          <div className="absolute top-0 inset-x-0 p-4 pt-8 flex justify-between items-start z-50 bg-gradient-to-b from-black/90 via-black/40 to-transparent">
            <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                    <span className="text-[11px] font-mono font-bold text-white uppercase tracking-widest">
                        {lang === 'ar' ? 'مباشر' : 'LIVE'}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/20 px-2 py-0.5 rounded border border-indigo-500/30">
                        {resolutionInfo.width}×{resolutionInfo.height}
                    </span>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-tighter">
                        {facingMode === 'environment' ? 'REAR_LENS' : 'FRONT_LENS'}
                    </span>
                </div>
            </div>

            <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose} 
                className="bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 p-0 backdrop-blur-md"
            >
                <X size={24} />
            </Button>
          </div>

          {/* Core Viewport */}
          <div className="relative flex-grow flex items-center justify-center bg-neutral-900">
            {!capturedImage ? (
              <>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover" 
                />
                
                {/* Visual Guides */}
                <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="relative aspect-[4/3] border border-white/10 rounded-[2.5rem] shadow-[0_0_0_1000px_rgba(0,0,0,0.4)]">
                        {/* Macro Focus Brackets */}
                        <div className="absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2 border-indigo-500/60 rounded-tl-xl" />
                        <div className="absolute top-8 right-8 w-10 h-10 border-t-2 border-r-2 border-indigo-500/60 rounded-tr-xl" />
                        <div className="absolute bottom-8 left-8 w-10 h-10 border-b-2 border-l-2 border-indigo-500/60 rounded-bl-xl" />
                        <div className="absolute bottom-8 right-8 w-10 h-10 border-b-2 border-r-2 border-indigo-500/60 rounded-br-xl" />
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center">
                                <Target size={20} className="text-white/20" />
                            </div>
                        </div>
                    </div>
                    <p className="mt-8 text-center text-[11px] font-bold text-white/60 tracking-[0.3em] uppercase">
                        {lang === 'ar' ? 'ضع الكود في المنتصف' : 'CENTER CODE IN VIEW'}
                    </p>
                </div>
              </>
            ) : (
              <div className="relative w-full h-full flex flex-col items-center justify-center bg-black/95 p-4">
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  className="max-h-[70vh] border border-indigo-500/50 rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/20"
                >
                  <img src={capturedImage} alt="Capture" className="max-w-full max-h-[70vh]" />
                </ReactCrop>
                <div className="mt-8 flex items-center gap-3">
                    <Scissors size={14} className="text-indigo-400" />
                    <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">
                        {lang === 'ar' ? 'حدد المنطقة بدقة' : 'PRECISION CROP SELECTION'}
                    </span>
                </div>
              </div>
            )}
          </div>

          {/* Mobile-Optimized Control Deck */}
          <div className="bg-black p-6 space-y-8 border-t border-white/5 shadow-[0_-20px_40px_rgba(0,0,0,0.8)]">
            {!capturedImage ? (
                <>
                    {/* Horizontal Big-Touch Zoom Slider */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-full flex justify-between items-center px-4 text-white/40 text-[9px] font-mono tracking-widest">
                            <span>1.0×</span>
                            <span className="text-indigo-400 font-bold">{zoom.toFixed(1)}×</span>
                            <span>5.0×</span>
                        </div>
                        <div className="w-full relative px-2 flex items-center h-10">
                            <input 
                                type="range"
                                min="1"
                                max="5"
                                step="0.1"
                                value={zoom}
                                onChange={(e) => updateConstraint('zoom', parseFloat(e.target.value))}
                                className="w-full h-1.5 bg-white/10 rounded-full appearance-none accent-indigo-500 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Master Actions */}
                    <div className="flex justify-between items-center max-w-sm mx-auto w-full pb-4">
                        <button 
                            onClick={toggleFacingMode}
                            className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-1 hover:bg-white/10 transition-colors"
                        >
                            <RefreshCw size={22} className="text-white" />
                        </button>

                        <motion.button
                            whileTap={{ scale: 0.92 }}
                            onClick={handleLiveCapture}
                            disabled={isProcessing}
                            className="relative"
                        >
                            {/* Outer Ring */}
                            <div className="w-24 h-24 rounded-full border-2 border-white/20 flex items-center justify-center p-2">
                                {/* Inner Trigger */}
                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                    {isProcessing ? (
                                        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <div className="w-18 h-18 rounded-full border-2 border-black/5" />
                                    )}
                                </div>
                            </div>
                        </motion.button>

                        <div className="w-14 h-14 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex flex-col items-center justify-center gap-1">
                            <Target size={22} className="text-indigo-400" />
                            <span className="text-[7px] font-mono font-bold text-indigo-400">AF-C</span>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center gap-12 pb-8">
                    <div className="flex flex-col items-center gap-3">
                        <button
                            onClick={handleRetake}
                            className="w-18 h-18 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all active:scale-90"
                        >
                            <RefreshCw size={28} />
                        </button>
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{lang === 'ar' ? 'إعادة' : 'RETAKE'}</span>
                    </div>

                    <div className="flex flex-col items-center gap-3">
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
                            className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center shadow-[0_0_60px_rgba(79,70,229,0.4)] transition-all active:scale-90"
                        >
                            {isProcessing ? (
                                <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Check size={48} className="text-white" />
                            )}
                        </motion.button>
                        <span className="text-[11px] font-black text-white uppercase tracking-[0.3em]">{lang === 'ar' ? 'تأكيد' : 'SCAN'}</span>
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
