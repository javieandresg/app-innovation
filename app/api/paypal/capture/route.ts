import { NextResponse } from "next/server";
import { getPayPalSubscription } from "@/lib/paypal";
import prismadb from "@/lib/prismadb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const subscriptionId = searchParams.get("subscription_id");

    if (!subscriptionId) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`);
    }

    const subscription = await getPayPalSubscription(subscriptionId);
    const userId = subscription.custom_id;

    if (!userId) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`);
    }

    await prismadb.userSubscription.upsert({
      where: { userId },
      create: {
        userId,
        paypalSubscriptionId: subscription.id,
        paypalStatus: subscription.status,
        paypalCurrentPeriodEnd: subscription.billing_info?.next_billing_time
          ? new Date(subscription.billing_info.next_billing_time)
          : null,
      },
      update: {
        paypalSubscriptionId: subscription.id,
        paypalStatus: subscription.status,
        paypalCurrentPeriodEnd: subscription.billing_info?.next_billing_time
          ? new Date(subscription.billing_info.next_billing_time)
          : null,
      },
    });

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`);
  } catch (error) {
    console.log("[PAYPAL_CAPTURE_ERROR]", error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`);
  }
}
