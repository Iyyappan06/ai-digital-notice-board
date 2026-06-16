import { GoogleGenerativeAI } from "@google/generative-ai";

import type { Notice } from "./notices";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "Missing GEMINI_API_KEY. Add it to your .env.local file."
  );
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function searchWithAI(
  question: string,
  notices: Notice[]
): Promise<string> {

  // Updated model
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  if (!notices || notices.length === 0) {
    return "There are currently no notices available to answer your question.";
  }

  const noticeContext = notices
    .map(
      (n, i) => `
Notice ${i + 1}

Title: ${n.title}

Category: ${n.category}

Description: ${n.description}

Posted: ${new Date(
          n.created_at
        ).toLocaleDateString("en-IN")}

${n.expiry_date
  ? `Expiry: ${new Date(
      n.expiry_date
    ).toLocaleDateString("en-IN")}`
  : ""}

Important: ${n.important ? "Yes" : "No"}
`
    )
    .join("\n---------------------------------\n");

  const prompt = `
You are an AI assistant for a Digital Notice Board.

Rules:

1. Answer ONLY using the notices below.

2. Do NOT invent information.

3. If the answer is unavailable, reply:

"I couldn't find relevant information in the current notices."

4. Keep answers short, professional and friendly.

5. Include dates if available.

NOTICES:

${noticeContext}

QUESTION:

${question}

ANSWER:
`;

  try {

    const result =
      await model.generateContent(prompt);

    return result.response
      .text()
      .trim();

  } catch (error) {

    console.error(error);

    return "AI service is temporarily unavailable.";
  }
}