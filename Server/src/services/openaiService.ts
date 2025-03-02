
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();

const apiKey = process.env.YOUR_GOOGLE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("Missing Google Gemini API Key. Please check your .env file.");
}

const genAI = new GoogleGenerativeAI(apiKey);


export const generateTaskDescription = async (title: string): Promise<string> => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(`Generate a accurate short task description for: ${title}`);
        // console.log("Response >>",response?.candidates)
        // console.log(result?.response.text());
        // const text = result?.candidates?.[0]?.content?.parts?.[0]?.text || "No description generated.";
        const text=result?.response.text();
        return text;
    } catch (error) {
        console.error("Error generating task description:", error);
        throw error;
    }
}

