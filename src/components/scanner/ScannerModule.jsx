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
  capabilities,
  resolutionInfo,
  toggleFacingMode,
  updateConstraint,
  zoom,
}) => {
  const { lang } = useLanguage();
  const [capturedImage, setCapturedImage] = useState(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();

  // Reset states on open/close
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
      // Perfect centering for mobile chips
      setCrop({
        unit: '%',
        x: 20,
        y: 40,
        width: 60,
        height: 20
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
          {/* Professional HUD */}
          <div className="absolute top-0 inset-x-0 p-4 pt-10 flex justify-between items-start z-50 bg-gradient-to-b from-black/90 to-transparent">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
                    <span className="text-[10px] font-mono font-black text-white/90 uppercase tracking-widest">
                        {lang === 'ar' ? 'البث المباشر' : 'PRO_SCAN_ACTIVE'}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-white/40 bg-white/5 px-2 py-0.5 rounded border border-white/10 uppercase">
                        {resolutionInfo.width}×{resolutionInfo.height}
                    </span>
                    {capabilities.focusMode?.includes('continuous') && (
                        <span className="text-[9px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                            AF-C
                        </span>
                    )}
                </div>
            </div>

            <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose} 
                className="bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 p-0 backdrop-blur-md transition-all active:scale-90"
            >
                <X size={24} />
            </Button>
          </div>

          {/* Viewfinder Workspace */}
          <div className="relative flex-grow flex items-center justify-center bg-black overflow-hidden">
            {!capturedImage ? (
              <>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover opacity-90" 
                />
                
                {/* Tactical Overlays */}
                <div className="absolute inset-x-10 top-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="relative aspect-[4/2] border border-white/20 rounded-2xl shadow-[0_0_0_1000px_rgba(0,0,0,0.6)]">
                        {/* Precision Brackets */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-indigo-500 rounded-tl-xl" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-indigo-500 rounded-tr-xl" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-indigo-500 rounded-bl-xl" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-indigo-500 rounded-br-xl" />
                        
                        {/* Scanning Line Effect */}
                        <motion.div 
                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-indigo-500/5 rounded-2xl"
                        />
                    </div>
                </div>
                
                <div className="absolute bottom-12 inset-x-0 text-center pointer-events-none">
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] animate-pulse">
                        {lang === 'ar' ? 'حدد المنطقة بدقة' : 'ALIGN_CODE_WINDOW'}
                    </p>
                </div>
              </>
            ) : (
              <div className="relative w-full h-full flex flex-col items-center justify-center bg-black/95 p-6 pb-20">
                <div className="relative group">
                    <ReactCrop
                      crop={crop}
                      onChange={(c) => setCrop(c)}
                      onComplete={(c) => setCompletedCrop(c)}
                      className="max-h-[60vh] border border-white/20 rounded-xl overflow-hidden shadow-2xl"
                    >
                      <img src={capturedImage} alt="Capture" className="max-w-full max-h-[60vh]" />
                    </ReactCrop>
                    
                    {/* Character Whitelist HUD */}
                    <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-2">
                        <span className="text-[9px] font-mono text-white/40 bg-white/5 px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
                            {lang === 'ar' ? 'أحرف مدعومة: A-Z 0-9' : 'SUPPORTED: A-Z 0-9'}
                        </span>
                    </div>
                </div>
              </div>
            )}
          </div>

          {/* Master Control Deck (Optimized for One-Hand Use) */}
          <div className="bg-black/95 p-6 space-y-8 border-t border-white/5 backdrop-blur-xl">
            {!capturedImage ? (
                <>
                    {/* Hardware Zoom Slider - Contextual Display */}
                    {capabilities.zoom && (
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-full flex justify-between items-center px-4 text-white/50 text-[9px] font-mono tracking-widest">
                                <span>{capabilities.zoom.min.toFixed(1)}x</span>
                                <span className="text-indigo-400 font-bold">{zoom.toFixed(1)}x</span>
                                <span>{capabilities.zoom.max.toFixed(1)}x</span>
                            </div>
                            <div className="w-full relative px-2 flex items-center h-8">
                                <input 
                                    type="range"
                                    min={capabilities.zoom.min}
                                    max={capabilities.zoom.max > 4 ? 4 : capabilities.zoom.max} // Limit to 4x to preserve text clarity
                                    step="0.1"
                                    value={zoom}
                                    onChange={(e) => updateConstraint('zoom', parseFloat(e.target.value))}
                                    className="w-full h-1 bg-white/10 rounded-full appearance-none accent-indigo-500 cursor-pointer"
                                />
                            </div>
                        </div>
                    )}

                    {/* Actions Row */}
                    <div className="flex justify-between items-center max-w-md mx-auto w-full px-4">
                        <motion.button 
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleFacingMode}
                            className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white"
                        >
                            <RefreshCw size={22} />
                        </motion.button>

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLiveCapture}
                            disabled={isProcessing}
                            className="relative flex items-center justify-center"
                        >
                            <div className="w-24 h-24 rounded-full border-4 border-white/10 flex items-center justify-center p-1.5 transition-all group-hover:border-white/30">
                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center shadow-2xl">
                                    {isProcessing ? (
                                        <div className="w-10 h-10 border-4 border-black/10 border-t-indigo-500 rounded-full animate-spin" />
                                    ) : (
                                        <Camera size={28} className="text-black" />
                                    )}
                                </div>
                            </div>
                        </motion.button>

                        <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex flex-col items-center justify-center opacity-30">
                            <Target size={22} className="text-white" />
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center gap-16 pb-6">
                    <div className="flex flex-col items-center gap-3">
                        <button
                            onClick={handleRetake}
                            className="w-16 h-16 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-white active:bg-white/10"
                        >
                            <RefreshCw size={24} />
                        </button>
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{lang === 'ar' ? 'إلغاء' : 'RETAKE'}</span>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={async () => {
                                if (!completedCrop) return;
                                const code = await processOCROnCrop(capturedImage, completedCrop);
                                if (code) {
                                    onDetected(code);
                                    onClose();
                                }
                            }}
                            disabled={isProcessing}
                            className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center shadow-[0_0_60px_rgba(79,70,229,0.3)] transition-all"
                        >
                            {isProcessing ? (
                                <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Check size={42} className="text-white" />
                            )}
                        </motion.button>
                        <span className="text-[11px] font-black text-white uppercase tracking-[0.3em]">{lang === 'ar' ? 'تاكيد' : 'CONFIRM'}</span>
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
