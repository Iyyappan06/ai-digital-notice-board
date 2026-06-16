import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Notice } from "./notices";
 
const apiKey = process.env.GEMINI_API_KEY;
 
if (!apiKey) {
  throw new Error(
    "Missing GEMINI_API_KEY. Add it to your .env.local file."
  );
}
 
const genAI = new GoogleGenerativeAI(apiKey);
 
/**
 * Given a user question and the current list of notices,
 * ask Gemini to answer using only the notice content.
 */
export async function searchWithAI(
  question: string,
  notices: Notice[]
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
 
  if (notices.length === 0) {
    return "There are currently no notices available to answer your question.";
  }
 
  // Build a compact text representation of all notices for the prompt
  const noticeContext = notices
    .map(
      (n, i) =>
        `[Notice ${i + 1}]
Title: ${n.title}
Category: ${n.category}
Description: ${n.description}
Date Posted: ${new Date(n.created_at).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}${n.expiry_date ? `\nExpiry: ${new Date(n.expiry_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}` : ""}
Important: ${n.important ? "Yes" : "No"}`
    )
    .join("\n\n---\n\n");
 
  const prompt = `You are a helpful assistant for a Digital Notice Board system.
Your job is to answer user questions accurately based ONLY on the notice information provided below.
 
Rules:
1. Answer only from the notice data provided – do not fabricate or assume information.
2. If the answer is not in the notices, say: "I couldn't find relevant information in the current notices."
3. Be concise and friendly.
4. If a notice mentions specific dates, times, or venues, include those in your answer.
5. Do not mention "notice 1", "notice 2" etc. – just answer naturally.
 
--- AVAILABLE NOTICES ---
${noticeContext}
--- END OF NOTICES ---
 
User Question: ${question}
 
Answer:`;
 
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().trim();
}
 