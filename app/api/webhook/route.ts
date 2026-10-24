import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const eventType = body.event_type;
    const resource = body.resource;

    if (eventType === "BILLING.SUBSCRIPTION.ACTIVATED") {
      const userId = resource.custom_id;
      if (userId) {
        await prismadb.userSubscription.upsert({
          where: { userId },
          create: {
            userId,
            paypalSubscriptionId: resource.id,
            paypalStatus: "ACTIVE",
            paypalCurrentPeriodEnd: resource.billing_info?.next_billing_time
              ? new Date(resource.billing_info.next_billing_time)
              : null,
          },
          update: {
            paypalStatus: "ACTIVE",
            paypalCurrentPeriodEnd: resource.billing_info?.next_billing_time
              ? new Date(resource.billing_info.next_billing_time)
              : null,
          },
        });
      }
    }

    if (eventType === "BILLING.SUBSCRIPTION.UPDATED" || eventType === "PAYMENT.SALE.COMPLETED") {
      const subscriptionId = resource.billing_agreement_id || resource.id;
      if (subscriptionId) {
        await prismadb.userSubscription.updateMany({
          where: { paypalSubscriptionId: subscriptionId },
          data: {
            paypalStatus: "ACTIVE",
            paypalCurrentPeriodEnd: resource.billing_info?.next_billing_time
              ? new Date(resource.billing_info.next_billing_time)
              : null,
          },
        });
      }
    }

    if (eventType === "BILLING.SUBSCRIPTION.CANCELLED" || eventType === "BILLING.SUBSCRIPTION.SUSPENDED") {
      const subscriptionId = resource.id;
      if (subscriptionId) {
        await prismadb.userSubscription.updateMany({
          where: { paypalSubscriptionId: subscriptionId },
          data: { paypalStatus: "CANCELLED" },
        });
      }
    }

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.log("[WEBHOOK_ERROR]", error);
    return new NextResponse("OK", { status: 200 });
  }
}
