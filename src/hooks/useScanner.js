import { useState, useRef, useCallback, useEffect } from 'react';
import { performOCR } from '../services/ocrService';

export const useScanner = () => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stream, setStream] = useState(null);
  const [facingMode, setFacingMode] = useState('environment');
  const [zoom, setZoom] = useState(1);
  const [exposure, setExposure] = useState(0);
  const [resolutionInfo, setResolutionInfo] = useState({ width: 0, height: 0 });
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = useCallback(async (mode = 'environment') => {
    setIsScannerOpen(true);
    setFacingMode(mode);
    try {
      const constraints = {
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 4096 }, // Try for 4K
          height: { ideal: 2160 }
        },
        audio: false
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      
      const track = mediaStream.getVideoTracks()[0];
      const settings = track.getSettings();
      setResolutionInfo({ width: settings.width, height: settings.height });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play().catch(e => console.error("Camera play error:", e));
      }

      // Check for capabilities
      const caps = track.getCapabilities();
      if (caps.zoom) {
        setZoom(settings.zoom || 1);
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setIsScannerOpen(false);
      throw new Error(err.message === 'Permission denied' ? 'Please allow camera access' : 'Cannot access camera');
    }
  }, []);

  const toggleFacingMode = useCallback(() => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    closeCamera();
    startCamera(nextMode);
  }, [facingMode]);

  const updateConstraint = useCallback(async (key, value) => {
    if (!stream) return;
    const track = stream.getVideoTracks()[0];
    try {
      await track.applyConstraints({ [key]: value });
      if (key === 'zoom') setZoom(value);
      if (key === 'exposureCompensation') setExposure(value);
    } catch (e) {
      console.warn(`Failed to apply ${key}:`, e);
    }
  }, [stream]);

  const closeCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const vidStream = videoRef.current.srcObject;
      vidStream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setStream(null);
    setIsScannerOpen(false);
    setIsProcessing(false);
    setZoom(1);
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

      // Capture at native high resolution
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL('image/png'); // Use PNG for lossless capture
      return dataUrl;
    } catch (error) {
      console.error("Capture error:", error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing]);

  const processOCROnCrop = useCallback(async (imageSrc, crop) => {
    if (!imageSrc || !crop || isProcessing) return null;

    setIsProcessing(true);
    try {
      const image = new Image();
      image.src = imageSrc;
      await new Promise(resolve => image.onload = resolve);

      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      
      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;
      
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const base64 = canvas.toDataURL('image/jpeg', 1.0).split(',')[1];
      const detectedCode = await performOCR(base64);
      
      if (detectedCode) {
        return detectedCode.replace(/[^a-zA-Z0-9-]/g, "").toUpperCase();
      }
      return null;
    } catch (error) {
      console.error("OCR Crop error:", error);
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
    stream,
    facingMode,
    zoom,
    exposure,
    resolutionInfo,
    startCamera,
    closeCamera,
    captureImage,
    processOCROnCrop,
    toggleFacingMode,
    updateConstraint
  };
};
