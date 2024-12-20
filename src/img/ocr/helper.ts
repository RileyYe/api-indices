import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { z } from "zod";
import type { Part } from "@google/generative-ai";

async function processBase64Images(token: string, llmModel: string, prompt: string, base64Images: string[]) {
  
  const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(token);
  const model: GenerativeModel = genAI.getGenerativeModel({ model: llmModel });

  try {
    for (const base64Image of base64Images) {
      const textPart: Part = {
        text: prompt,
      };

      const imagePart: Part = {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image,
        },
      };

      const request = {
        contents: [
          {
            parts: [textPart, imagePart],
            role: "user"
          },
        ],
      };
      const result = await model.generateContent(request);
      return result.response.text();
    }

  } catch (error) {
    throw error;
  }
}

export { processBase64Images };
