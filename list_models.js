import fs from 'fs';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("Error: VITE_GEMINI_API_KEY is not set in .env file.");
  process.exit(1);
}

async function listModels() {
  try {
    console.log("Fetching available models via REST API...");
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    const data = await response.json();
    
    if (data.models) {
      console.log("Found " + data.models.length + " models.");
      const names = data.models.map(m => m.name);
      fs.writeFileSync('models.json', JSON.stringify(names, null, 2));
      console.log("Wrote models to models.json");
    } else {
      console.error("Failed to list models:", data);
    }
    
  } catch (error) {
    console.error("Error listing models:", error);
  }
}

listModels();
