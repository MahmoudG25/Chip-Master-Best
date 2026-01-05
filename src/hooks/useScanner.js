import { useState, useRef, useCallback } from 'react';
import { performOCR } from '../services/geminiService';

export const useScanner = () => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = useCallback(async () => {
    setIsScannerOpen(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      setStream(mediaStream);
      // Try direct attach just in case component is already mounted (rare but possible)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play().catch(e => console.error("Camera play error:", e));
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setIsScannerOpen(false);
      throw new Error(err.message === 'Permission denied' ? 'Please allow camera access' : 'Cannot access camera');
    }
  }, []);

  const closeCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    // Also check ref just in case
    if (videoRef.current && videoRef.current.srcObject) {
      const vidStream = videoRef.current.srcObject;
      vidStream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setStream(null);
    setIsScannerOpen(false);
    setIsProcessing(false);
  }, [stream]);

  const captureImage = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || isProcessing) return null;

    setIsProcessing(true);
    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (video.videoWidth === 0 || video.videoHeight === 0) {
        throw new Error("Camera not ready");
      }

      canvas.width = 800;
      canvas.height = (video.videoHeight / video.videoWidth) * 800;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const base64 = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
      const detectedCode = await performOCR(base64);
      
      if (detectedCode) {
        return detectedCode.replace(/[^a-zA-Z0-9-]/g, "").toUpperCase();
      }
      return null;
    } catch (error) {
      console.error("Capture error:", error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing]);

  return {
    isScannerOpen,
    isProcessing,
    videoRef,
    canvasRef,
    stream, // Exposed stream
    startCamera,
    closeCamera,
    captureImage
  };
};
