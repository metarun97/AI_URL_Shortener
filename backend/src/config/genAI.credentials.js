import { GoogleGenAI } from "@google/genai";

// AI integrated using credentials:-
const ai = new GoogleGenAI({
  apiKey:process.env.GEMINI_API_KEY,
});


export default ai;
