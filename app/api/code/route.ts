import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const systemMessage = {
  role: "system" as const,
  content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.",
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!process.env.GROQ_API_KEY) {
      return new NextResponse("Groq API Key not configured", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Missing messages", { status: 400 });
    }

    const isAllowed = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!isAllowed && !isPro) {
      return new NextResponse("API Limit Exceeded", { status: 403 });
    }

    const response = await groq.chat.completions.create({
      model: "qwen/qwen3.8-27b",
      messages: [systemMessage, ...messages],
    });

    if (!isPro) {
      await increaseApiLimit();
    }

    const text = response.choices[0]?.message?.content ?? "";
    return NextResponse.json({ role: "assistant", content: text }, { status: 200 });
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
