"use client";

import {
  ArrowRight,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const tools = [
  {
    label: "Captions & Scripts",
    description: "Ideas, captions, hooks and scripts for social media",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
    tag: "Instagram · TikTok · YouTube",
  },
  {
    label: "Music Generation",
    description: "Copyright-free music for Reels, TikToks and YouTube",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "/music",
    tag: "Royalty-free · No strikes",
  },
  {
    label: "Image Generation",
    description: "Thumbnails, posts and covers for every platform",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image",
    tag: "Instagram · YouTube · TikTok",
  },
  {
    label: "Video Generation",
    description: "Short AI video clips for Reels, TikTok and Shorts",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/video",
    tag: "Reels · TikTok · Shorts",
  },
  {
    label: "Code & Automation",
    description: "Automate your content workflow with AI-generated code",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code",
    tag: "Automation · Tools",
  },
];

const DashboardPage = () => {
  const router = useRouter();

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          What will you create today?
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          5 AI-powered tools to grow your audience on Instagram, TikTok and YouTube.
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div>
                <div className="font-semibold">{tool.label}</div>
                <div className="text-xs text-muted-foreground">{tool.description}</div>
                <div className={cn("text-xs font-medium mt-0.5", tool.color)}>{tool.tag}</div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
