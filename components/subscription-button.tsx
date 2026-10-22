"use client";

import { Zap } from "lucide-react";
import { FC } from "react";
import { toast } from "react-hot-toast";
import { Button } from "./ui/button";

interface SubscriptionButtonProps {
  isPro: boolean;
}

export const SubscriptionButton: FC<SubscriptionButtonProps> = ({ isPro = false }) => {
  const onClick = () => {
    toast("Payments coming soon. Stay tuned!", { icon: "🚀" });
  };

  return (
    <Button variant={isPro ? "default" : "premium"} onClick={onClick}>
      {isPro ? "Manage Subscription" : "Upgrade to Pro"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};
