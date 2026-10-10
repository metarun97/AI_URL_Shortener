import { GoogleGenAI } from '@google/genai';
import { z } from "zod";


/* Url Safety schema */
const urlSafetySchema = {
  type: "object",
  properties: {
    isUrlSafe: {
      type: "boolean",
      description: "Whether the URL is considered safe.",
    },
    risk: {
      type: "string",
      enum: ["low", "medium", "high", "unknown"],
      description: "The security risk level of the URL."
    },
    aiReason: {
      type: "string",
      description: "A short explanation for the safety assessment."
    }
  },
  required: ["isUrlSafe", "risk", "aiReason"]
};

const URLSchema = z.fromJSONSchema(urlSafetySchema);

/* Gemini instance created */
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    timeout: 15000,
    retryOptions: {
      attempts: 1,
    }
  }
});

/* Check safety by AI response */
const aiUrlSafetyCheck = async (originalUrl) => {


  const prompt = `Assess this URL for potential phishing,
impersonation, and suspicious domain patterns.
URL: ${originalUrl}
Return a concise assessment using the supplied JSON schema.`;

  try {
    const response = await ai.interactions.create({
      model: "gemini-3.5-flash-lite",
      input: prompt,
      response_format: {
        type: "text",
        mime_type: "application/json",
        schema: urlSafetySchema,
      }
    })

    const resResult = URLSchema.parse(JSON.parse(response.output_text));

    return resResult;
  }
  catch (error) {
    console.error("AI Service Error: ", error.message);
    return {
      isUrlSafe: null,
      risk: "unknown",
      aiReason: null,
    };
  }
}

export default aiUrlSafetyCheck;
