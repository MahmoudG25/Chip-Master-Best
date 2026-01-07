import { useState, useRef, useCallback, useEffect } from 'react';
import { performOCR } from '../services/ocrService';

export const useScanner = () => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [stream, setStream] = useState(null);
  const [facingMode, setFacingMode] = useState('environment');
  const [zoom, setZoom] = useState(1);
  const [exposure, setExposure] = useState(0);
  const [capabilities, setCapabilities] = useState({});
  const [resolutionInfo, setResolutionInfo] = useState({ width: 0, height: 0 });
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const detectCapabilities = (track) => {
    if (track && track.getCapabilities) {
      const caps = track.getCapabilities();
      setCapabilities(caps);
      return caps;
    }
    return {};
  };

  const startCamera = useCallback(async (mode = 'environment') => {
    setIsScannerOpen(true);
    setFacingMode(mode);
    setError(null);

    // 1. Context & API Verification
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      const isSecure = window.isSecureContext;
      const errorMsg = !isSecure 
        ? "Camera inhibited: Insecure context. Please use HTTPS."
        : "Camera API not supported by this browser.";
      setError(errorMsg);
      return;
    }

    try {
      // Primary Attempt: High Performance
      const constraints = {
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1920, min: 640 }, 
          height: { ideal: 1080, min: 480 },
          frameRate: { ideal: 60 }
        },
        audio: false
      };

      let mediaStream;
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (e) {
        console.warn("High-perf camera failed, falling back to basic:", e);
        // Fallback: Basic Back/Front camera without strict resolution
        mediaStream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: mode },
            audio: false 
        });
      }

      setStream(mediaStream);
      
      const track = mediaStream.getVideoTracks()[0];
      const settings = track.getSettings();
      setResolutionInfo({ width: settings.width || 0, height: settings.height || 0 });
      
      const caps = detectCapabilities(track);

      // Apply hardware-level continuous focus/exposure if available
      if (track.applyConstraints) {
        const advanced = {};
        if (caps.focusMode?.includes('continuous')) advanced.focusMode = 'continuous';
        if (caps.exposureMode?.includes('continuous')) advanced.exposureMode = 'continuous';
        
        if (Object.keys(advanced).length > 0) {
            await track.applyConstraints({ advanced: [advanced] }).catch(p => console.warn("Apply error:", p));
        }
      }

      if (caps.zoom) {
        setZoom(settings.zoom || 1);
      }
    } catch (err) {
      console.error("Camera access error:", err);
      let msg = "Could not start camera.";
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        msg = "Camera permission denied. Check your browser settings.";
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        msg = "No suitable camera hardware detected.";
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        msg = "Camera hardware is currently locked by another process.";
      } else if (err.name === 'OverconstrainedError') {
        msg = "Camera hardware cannot meet high-performance requirements.";
      }
      setError(msg);
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
      const caps = track.getCapabilities();
      if (caps[key]) {
        await track.applyConstraints({ advanced: [{ [key]: value }] });
        if (key === 'zoom') setZoom(value);
        if (key === 'exposureCompensation') setExposure(value);
      }
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
    setExposure(0);
    setCapabilities({});
  }, [stream]);

  // Advanced Image Pre-processing for OCR
  const preprocessCanvas = (canvas) => {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // 1. Convert to Grayscale & Boost Contrast
    let blackPixels = 0;
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i+1] + data[i+2]) / 3;
      let val = (avg - 128) * 1.8 + 128;
      val = Math.max(0, Math.min(255, val));
      
      const final = val > 120 ? 255 : 0; 
      if (final === 0) blackPixels++;

      data[i] = final;
      data[i + 1] = final;
      data[i + 2] = final;
    }

    // 3. Intelligent Inversion (Tesseract prefers black text on white background)
    // If the majority of the image is black, it's likely light text on dark background.
    const totalPixels = data.length / 4;
    if (blackPixels > totalPixels * 0.5) {
      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  };

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

      // PNG is lossless, better for OCR detection of tiny characters
      const dataUrl = canvas.toDataURL('image/png'); 
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
      // For mobile, we ensure the crop is calculated based on natural dimensions
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      
      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;
      
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      // High-precision cropping
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

      // MANDATORY Pre-processing for Precision
      preprocessCanvas(canvas);
      const base64 = canvas.toDataURL('image/png').split(',')[1];
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
    error,
    capabilities,
    resolutionInfo,
    startCamera,
    closeCamera,
    captureImage,
    processOCROnCrop,
    toggleFacingMode,
    updateConstraint
  };
};
