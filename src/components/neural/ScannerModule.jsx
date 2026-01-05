import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Camera } from 'lucide-react';
import { Button } from '../ui/Button'; // Adjusted path
import { useLanguage } from '../../contexts/LanguageContext';

export const ScannerModule = ({ 
  isOpen, 
  onClose, 
  onCapture, 
  isProcessing,
  videoRef,
  canvasRef,
  stream
}) => {
  const { lang } = useLanguage();

  React.useEffect(() => {
    if (isOpen && stream && videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(e => console.log("Play error:", e));
    }
  }, [isOpen, stream, videoRef]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-slate-950 dark:bg-black flex flex-col overflow-hidden transition-colors"
        >
          {/* Header */}
          <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center z-50 bg-gradient-to-b from-slate-950/80 dark:from-black/80 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/20 flex items-center justify-center border border-indigo-600/30">
                <Target size={18} className="text-indigo-600 animate-pulse" />
              </div>
              <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
                {lang === 'ar' ? 'نظام المسح البصري' : 'Optical Scan System'}
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose} 
              className="bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/15 text-white rounded-full w-10 h-10 p-0 transition-colors"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Viewfinder */}
          <div className="relative flex-grow">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover opacity-90 scale-105" 
            />
            
            {/* Target Area */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-8">
              <div className="relative w-full max-w-sm aspect-[4/3] border-2 border-indigo-600/40 rounded-[2.5rem] shadow-[0_0_100px_rgba(79,70,229,0.2)]">
                {/* Corner Markers */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-indigo-600 rounded-tl-[2rem]"></div>
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-indigo-600 rounded-tr-[2rem]"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-indigo-600 rounded-bl-[2rem]"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-indigo-600 rounded-br-[2rem]"></div>
                
                {/* Scanning Line */}
                <motion.div 
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="absolute left-0 right-0 h-1 bg-indigo-600/80 shadow-[0_0_25px_#4f46e5] z-10"
                />
              </div>
              
              <div className="mt-12 text-center">
                <p className="text-white font-mono text-xs bg-slate-900/60 dark:bg-black/60 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/5 uppercase tracking-widest leading-relaxed">
                  {isProcessing 
                    ? (lang === 'ar' ? 'جاري تحليل البيانات...' : 'ANALYZING DATA...') 
                    : (lang === 'ar' ? 'وجه الكاميرا نحو كود الرقاقة' : 'ALIGN CAMERA WITH CHIP CODE')}
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="h-40 bg-slate-950 dark:bg-black border-t border-white/5 flex flex-col items-center justify-center p-6 bg-gradient-to-t from-slate-900 dark:from-black to-slate-950 dark:to-black">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onCapture}
              disabled={isProcessing}
              className={`relative w-24 h-24 rounded-full flex items-center justify-center group transition-all duration-300 ${
                isProcessing ? 'bg-slate-800' : 'bg-white shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:shadow-[0_0_70px_rgba(255,255,255,0.3)]'
              }`}
            >
              {isProcessing ? (
                <div className="w-10 h-10 border-4 border-slate-600 border-t-indigo-600 rounded-full animate-spin" />
              ) : (
                <div className="w-16 h-16 rounded-full border-4 border-slate-950 group-hover:scale-110 transition-transform flex items-center justify-center">
                  <Camera size={28} className="text-slate-950 group-hover:block hidden" />
                </div>
              )}
            </motion.button>
            <p className="mt-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">
              {lang === 'ar' ? 'التحويل الرقمي AI' : 'AI DIGITAL CONVERSION'}
            </p>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
