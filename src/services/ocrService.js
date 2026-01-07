import Tesseract from 'tesseract.js';

/**
 * Performs OCR on a base64 image string using Tesseract.js
 * @param {string} base64Image - The base64 encoded image string (without data URI prefix)
 * @returns {Promise<string|null>} - The extracted text or null if failed
 */
export const performOCR = async (base64Image) => {
  try {
    console.log("Starting Client-Side OCR...");
    const imagePath = `data:image/jpeg;base64,${base64Image}`;
    
    const result = await Tesseract.recognize(
      imagePath,
      'eng',
      { 
        logger: m => console.log(m) // Optional: log progress
      }
    );

    const text = result.data.text;
    console.log("OCR Result:", text);
    
    return text?.trim() || null;
  } catch (error) {
    console.error("OCR Failed:", error);
    throw new Error("Text recognition failed. Please try again with better lighting.");
  }
};
