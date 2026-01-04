import { GoogleGenerativeAI } from "@google/generative-ai";
import { performOCRWithOpenAI, isOpenAIAvailable } from './openaiService';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
// TEMPORARILY DISABLED - Using OpenAI only
/*
try {
  if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
  } else {
    console.warn("AI API Key is missing. Using placeholder mode.");
  }
} catch (e) {
  console.error("AI Init Failed", e);
}
*/
console.warn("⚠️ Gemini is temporarily disabled. Using OpenAI for all requests.");

export const performOCR = async (base64Image) => {
  // TEMPORARILY DISABLED - Skip Gemini, use OpenAI directly
  if (!genAI) {
    console.warn("Gemini not available, using OpenAI directly...");
    if (isOpenAIAvailable()) {
      return await performOCRWithOpenAI(base64Image);
    } else {
      throw new Error("Both Gemini and OpenAI are unavailable. Please add VITE_OPENAI_API_KEY to .env");
    }
  }

  try {
    // Using gemini-2.0-flash as it's multimodal and fast
    const modelName = "gemini-2.0-flash";
    console.log("Initializing Gemini Vision with model:", modelName);
    const model = genAI.getGenerativeModel({ model: modelName });
    
    const prompt = "Read the text on the largest chip in this image. Return ONLY the alphanumeric code (like KMQE60013M, H9HKNNN, etc). Do not write sentences.";
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: "image/jpeg",
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();
    
    return text?.trim() || null;
  } catch (e) {
    console.error("Gemini OCR Error:", e);
    
    // Fallback to OpenAI if Gemini quota exceeded (429 error)
    if (e.message?.includes('429') || e.message?.includes('quota')) {
      console.warn("Gemini quota exceeded, falling back to OpenAI...");
      if (isOpenAIAvailable()) {
        try {
          return await performOCRWithOpenAI(base64Image);
        } catch (openaiError) {
          console.error("OpenAI fallback also failed:", openaiError);
          throw new Error("Both Gemini and OpenAI failed. Please check your API keys and quotas.");
        }
      } else {
        throw new Error("Gemini quota exceeded and OpenAI is not configured. Please add VITE_OPENAI_API_KEY to .env");
      }
    }
    
    throw e;
  }
};

export const searchChipInGoogle = async (code) => {
  if (!genAI) return null;

  try {
    const modelName = "gemini-2.0-flash";
    console.log("Initializing Gemini Search with model:", modelName);
    const model = genAI.getGenerativeModel({ 
      model: modelName,
      tools: [{ googleSearch: {} }]
    });

    const prompt = `
      Search for memory chip specs: "${code}".
      Return valid JSON only in this format:
      {
        "size": "Capacity (e.g. 64GB)",
        "brand": "Manufacturer",
        "description": "Short summary in Arabic",
        "techDetails": { "type": "DDR Type", "speed": "Speed", "devices": "Compatible phones" }
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) throw new Error("No response from AI");

    // Clean up markdown code blocks if present
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(cleanText);

    // Extract grounding metadata if available (SDK generic support)
    // Note: Verify response structure for grounding in used SDK version
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    const sources = groundingMetadata?.groundingChunks?.map((c) => ({
      title: c.web?.title || "Web Source", 
      uri: c.web?.uri || ""
    })).filter((s) => s.uri) || [];

    return {
      size: data.size || "Unknown",
      brand: data.brand || "Generic",
      description: data.description || "لا يوجد وصف متاح",
      techDetails: data.techDetails,
      sources
    };
  } catch (e) {
    console.error("Neural Search Error:", e);
    // Fallback or return partial error structure
    return null;
  }
};
