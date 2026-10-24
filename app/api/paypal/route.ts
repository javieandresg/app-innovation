import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
import { createPayPalSubscription } from "@/lib/paypal";
import prismadb from "@/lib/prismadb";

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const existing = await prismadb.userSubscription.findUnique({ where: { userId } });

    if (existing?.paypalSubscriptionId && existing?.paypalStatus === "ACTIVE") {
      return NextResponse.json({ url: `${process.env.NEXT_PUBLIC_APP_URL}/settings` });
    }

    const approvalUrl = await createPayPalSubscription(userId);
    return NextResponse.json({ url: approvalUrl });
  } catch (error) {
    console.log("[PAYPAL_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
