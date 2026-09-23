import { GoogleGenAI } from '@google/genai';
import { z } from "zod";


const urlSafetySchema = {
  type: "object",
  properties: {
    isUrlSafe: {
      type: "boolean",
      description: "Whether the URL is considered safe.",
    },
    risk: {
      type: "string",
      enum: ["low", "medium", "high"],
      description: "The security risk level of the URL."
    },
    aiReason: {
      type: "string",
      description: "A short explanation for the safety assessment."
    }
  },
  required: ["isUrlSafe", "risk", "aiReason"]
};


const urLSchema = z.fromJSONSchema(urlSafetySchema);


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/* Check safety by AI */
export const checkUrlSafety = async (url) => {

  const prompt = `
Analyze the following URL for security risks:

URL: ${url}

Determine whether the URL is safe or potentially malicious.
Check for signs of phishing, suspicious domains, impersonation, scams,
or other potentially harmful patterns.

Return the safety assessment according to the provided JSON schema.
`;

  try {
    const response = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: prompt,
      response_format: {
        type: "text",
        mime_type: "application/json",
        schema: urlSafetySchema,
      }
    })

    return urLSchema.parse(JSON.parse(response.output_text));

  }
  catch (error) {
    console.error("[checkUrlSafety Error]:", error.message);
    return {
      isUrlSafe: null || false,
      risk: "unknown",
      aiReason: "AI UrlSafety service unavailable."
    };
  }
}
