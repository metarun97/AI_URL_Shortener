import ai from "../config/ai.service.js";

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

  const response = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: prompt,
  })
  return response.output_text
}
