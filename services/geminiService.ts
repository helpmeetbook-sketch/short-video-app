
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateQuickTip = async (description: string, tags: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on this educational video description: "${description}" and these tags: ${tags.join(', ')}, generate a one-sentence "Pro Tip" for students. Make it punchy and actionable.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 50,
      }
    });
    return response.text || "Keep learning every day!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Never stop exploring new skills!";
  }
};

export const generateSummary = async (description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize the following educational video description into exactly 3 punchy, Gen-Z friendly bullet points: "${description}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["summary"]
        }
      }
    });
    
    const parsed = JSON.parse(response.text || '{"summary": []}');
    return (parsed.summary as string[]) || [];
  } catch (error) {
    console.error("Summary Generation Error:", error);
    return ["Quick learning session", "Skill improvement", "Daily progress"];
  }
};
