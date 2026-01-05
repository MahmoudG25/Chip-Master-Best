import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from 'fs';
import path from 'path';

// Manually load .env to ensure we get the VITE_ prefix key
const envPath = path.resolve(process.cwd(), '.env');
const envConfig = dotenv.parse(fs.readFileSync(envPath));
const API_KEY = envConfig.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("Error: VITE_GEMINI_API_KEY not found in .env");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

    const candidates = [
        "gemini-1.5-flash"
    ];

    console.log("Searching for ONE working model...");

    for (const modelName of candidates) {
        try {
            // console.log(`Testing ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Test");
            const response = await result.response;
            const text = response.text();
            if (text) {
                console.log(`!!! WINNER: ${modelName} !!!`);
                break; // Stop at first success
            }
        } catch (e) {
            // Silent fail to keep output clean
        }
        await new Promise(r => setTimeout(r, 500));
    }
