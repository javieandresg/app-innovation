import { headers } from "next/headers";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { paddle } from "@/lib/paddle";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("paddle-signature") as string;

  let event;

  try {
    event = await paddle.webhooks.unmarshal(body, process.env.PADDLE_WEBHOOK_SECRET!, signature);
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  if (event.eventType === "subscription.activated") {
    const sub = event.data as any;
    const userId = sub.customData?.userId;

    if (!userId) {
      return new NextResponse("Missing userId", { status: 400 });
    }

    await prismadb.userSubscription.upsert({
      where: { userId },
      create: {
        userId,
        paddleCustomerId: sub.customerId,
        paddleSubscriptionId: sub.id,
        paddlePriceId: sub.items?.[0]?.price?.id,
        paddleStatus: sub.status,
        paddleCurrentPeriodEnd: sub.currentBillingPeriod?.endsAt
          ? new Date(sub.currentBillingPeriod.endsAt)
          : null,
      },
      update: {
        paddleCustomerId: sub.customerId,
        paddlePriceId: sub.items?.[0]?.price?.id,
        paddleStatus: sub.status,
        paddleCurrentPeriodEnd: sub.currentBillingPeriod?.endsAt
          ? new Date(sub.currentBillingPeriod.endsAt)
          : null,
      },
    });
  }

  if (event.eventType === "subscription.updated") {
    const sub = event.data as any;

    await prismadb.userSubscription.update({
      where: { paddleSubscriptionId: sub.id },
      data: {
        paddlePriceId: sub.items?.[0]?.price?.id,
        paddleStatus: sub.status,
        paddleCurrentPeriodEnd: sub.currentBillingPeriod?.endsAt
          ? new Date(sub.currentBillingPeriod.endsAt)
          : null,
      },
    });
  }

  if (event.eventType === "subscription.canceled") {
    const sub = event.data as any;

    await prismadb.userSubscription.update({
      where: { paddleSubscriptionId: sub.id },
      data: { paddleStatus: "canceled" },
    });
  }

  return new NextResponse("OK", { status: 200 });
}
