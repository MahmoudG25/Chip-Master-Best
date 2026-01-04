import OpenAI from 'openai';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

let openai = null;
try {
  if (API_KEY) {
    openai = new OpenAI({
      apiKey: API_KEY,
      dangerouslyAllowBrowser: true // Required for client-side usage
    });
  } else {
    console.warn("OpenAI API Key is missing. OpenAI fallback disabled.");
  }
} catch (e) {
  console.error("OpenAI Init Failed", e);
}

export const performOCRWithOpenAI = async (base64Image) => {
  if (!openai) {
    throw new Error("OpenAI service not initialized. Check API Key.");
  }

  try {
    console.log("Using OpenAI GPT-4 Vision for OCR");
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Cost-effective vision model
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Read the text on the largest chip in this image. Return ONLY the alphanumeric code (like KMQE60013M, H9HKNNN, etc). Do not write sentences."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 100
    });

    const text = response.choices[0]?.message?.content;
    return text?.trim() || null;
  } catch (e) {
    console.error("OpenAI OCR Error:", e);
    throw e;
  }
};

export const isOpenAIAvailable = () => {
  return openai !== null;
};
