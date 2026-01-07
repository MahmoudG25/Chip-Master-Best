import Tesseract from 'tesseract.js';

/**
 * Performs OCR on a base64 image string using Tesseract.js
 * @param {string} base64Image - The base64 encoded image string (without data URI prefix)
 * @returns {Promise<string|null>} - The extracted text or null if failed
 */
export const performOCR = async (base64Image) => {
  try {
    console.log("Starting Client-Side OCR...");
    const imagePath = `data:image/png;base64,${base64Image}`;
    
    const result = await Tesseract.recognize(
      imagePath,
      'eng',
      { 
        logger: m => console.log(`[OCR] ${m.status}: ${(m.progress * 100).toFixed(0)}%`),
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-',
        tessedit_pageseg_mode: '7', // Treat as single text line
        tessjs_create_hocr: '0',
        tessjs_create_tsv: '0',
        tessjs_create_pdf: '0'
      }
    );

    const text = result.data.text;
    console.log("OCR Result (Raw):", text);
    
    return text?.trim() || null;
  } catch (error) {
    console.error("OCR Failed:", error);
    throw new Error("Text recognition failed. Please try again with better lighting.");
  }
};
