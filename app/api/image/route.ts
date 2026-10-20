import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = "1", resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!process.env.REPLICATE_API_TOKEN) {
      return new NextResponse("Replicate API token not configured", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Missing prompt", { status: 400 });
    }

    const isAllowed = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!isAllowed && !isPro) {
      return new NextResponse("API Limit Exceeded", { status: 403 });
    }

    const [width, height] = resolution.split("x").map(Number);

    const output = await replicate.run(
      "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb0ad325e4ced24b5b85db78f",
      {
        input: {
          prompt,
          num_outputs: parseInt(amount, 10),
          width,
          height,
        },
      }
    ) as string[];

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(output.map((url) => ({ url })), { status: 200 });
  } catch (error) {
    console.log("[IMAGE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
