import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { paddle } from "@/lib/paddle";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userSubscription = await prismadb.userSubscription.findUnique({
      where: { userId },
    });

    if (userSubscription?.paddleCustomerId && userSubscription?.paddleSubscriptionId) {
      const session = await paddle.customerPortalSessions.create(
        userSubscription.paddleCustomerId,
        [userSubscription.paddleSubscriptionId]
      );
      return NextResponse.json({ url: session.urls.general.overview });
    }

    const transaction = await paddle.transactions.create({
      items: [{ priceId: process.env.PADDLE_PRICE_ID!, quantity: 1 }],
      customData: { userId },
    });

    return NextResponse.json({ url: transaction.checkout?.url });
  } catch (error) {
    console.log("[PADDLE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
