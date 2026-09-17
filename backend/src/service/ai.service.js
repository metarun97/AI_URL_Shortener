import { Type } from '@google/genai';
import ai from '../config/genAI.credentials.js';


/* Check safety by AI */
export const checkUrlSafety = async (url) => {
  const prompt = `
Check whether this URL is safe or suspicious.

URL: ${url}

Analyze the URL for possible security risks such as:
- phishing
- malware
- suspicious domain patterns
- misleading URLs
- known malicious-looking patterns

Return ONLY valid JSON. Do not include markdown, code fences, or extra text.

The JSON must follow exactly this structure:

{
  "isUrlSafe": true,
  "risk": "low",
  "aiReason": "Short explanation of why the URL is considered safe or suspicious."
}

Rules:
- "isUrlSafe" must be a boolean: true or false.
- "risk" must be exactly one of: "low", "medium", "high".
- "aiReason" must be a short string.
`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isUrlSafe: { type: Type.BOOLEAN },
            risk: { type: Type.STRING, enum: ["low", "medium", "high"] },
            aiReason: { type: Type.STRING }
          },
          required: ['isUrlSafe', 'risk', 'aiReason'],
        },
        temperature: 0.1
      }
    })
    return JSON.parse(response.text || {});
  }
  catch (error) {
    console.error("[checkUrlSafety Error]:", error.message);
    return {
      isUrlSafe: false,
      risk: "high",
      aiReason: "AI verification service unavailable."
    };
  }
}
