
import { Video, Category, Quiz } from '../types';
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getRecommendedVideos = (userInterests: string[]): Video[] => {
  // In a real app, this would be a Firestore query based on interests
  return []; 
};

export const generateAIVideoMetadata = async (description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this video description: "${description}". 
      Generate: 
      1. A list of 3 viral hashtags.
      2. A multiple-choice quiz (Question, 4 options, correct index).
      3. A one-sentence actionable learning tip.
      Respond in strictly JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            tip: { type: Type.STRING },
            quiz: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctIndex: { type: Type.NUMBER }
              },
              required: ["question", "options", "correctIndex"]
            }
          },
          required: ["tags", "tip", "quiz"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Generation Error:", error);
    return null;
  }
};
