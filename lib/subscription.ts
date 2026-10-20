import { auth } from "@clerk/nextjs";

import prismadb from "./prismadb";

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: { userId },
    select: {
      paddleSubscriptionId: true,
      paddleCurrentPeriodEnd: true,
      paddlePriceId: true,
      paddleStatus: true,
    },
  });

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.paddleStatus === "active" &&
    userSubscription.paddleCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return !!isValid;
};
