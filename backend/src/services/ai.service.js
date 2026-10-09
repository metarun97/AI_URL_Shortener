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
});

/* Check safety by AI response */
const aiUrlSafetyCheck = async (originalUrl) => {

  const prompt = `
Analyze the following URL for security risks:
URL: ${originalUrl}
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

    return URLSchema.parse(JSON.parse(response.output_text));
  }
  catch (error) {
    console.error(error.message);
    return {
      isUrlSafe: null,
      risk: "unknown",
      aiReason: null,
    };
  }
}

export default aiUrlSafetyCheck;
