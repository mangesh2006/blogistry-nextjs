import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);

    const output = result.response.text();

    return new Response(JSON.stringify({ output }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ output: "Server error" }), {
      status: 500,
    });
  }
}
