"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Code, ImageIcon, MessageSquare, Music, VideoIcon, Zap, TrendingUp, Clock } from "lucide-react";

const features = [
  {
    icon: ImageIcon,
    title: "Thumbnails & Posts",
    description: "Generate stunning visuals for Instagram, YouTube thumbnails, TikTok covers and Facebook posts — in the exact right size.",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
    border: "border-pink-500/20",
    tag: "Instagram · YouTube · TikTok",
  },
  {
    icon: VideoIcon,
    title: "Short Video Clips",
    description: "Turn your ideas into short AI-generated video clips perfect for TikTok, Instagram Reels and YouTube Shorts.",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    border: "border-orange-500/20",
    tag: "Reels · TikTok · Shorts",
  },
  {
    icon: Music,
    title: "Copyright-Free Music",
    description: "Create original background music for your videos. No royalties, no copyright strikes — ever.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    tag: "No copyright · Royalty-free",
  },
  {
    icon: MessageSquare,
    title: "Captions & Scripts",
    description: "Generate viral captions, hooks, video scripts, bio descriptions and content ideas in seconds.",
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
    border: "border-violet-500/20",
    tag: "Captions · Scripts · Ideas",
  },
  {
    icon: Code,
    title: "Automation & Tools",
    description: "Build custom tools and automate your content workflow with AI-generated code. No experience needed.",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    border: "border-green-500/20",
    tag: "Automation · Workflows",
  },
];

const benefits = [
  {
    icon: Clock,
    title: "Save 10+ hours per week",
    description: "Stop spending hours creating content manually. Let AI handle thumbnails, music and captions while you focus on growing.",
  },
  {
    icon: TrendingUp,
    title: "Grow faster on every platform",
    description: "Consistent, high-quality content is the key to growth. Publish more, more often, without burning out.",
  },
  {
    icon: Zap,
    title: "Everything in one place",
    description: "No more switching between 5 different tools. Images, videos, music, text and code — all here for $19.99/month.",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-6 md:px-10 pb-24 space-y-24">

      {/* Features */}
      <div id="features">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-3xl md:text-4xl text-white font-extrabold">
            Every tool a creator needs
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            5 powerful AI tools in one platform — for just <span className="text-white font-semibold">$19.99/month</span>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {features.map((feature) => (
            <Card key={feature.title} className={`bg-white/5 border ${feature.border} text-white backdrop-blur-sm hover:bg-white/10 transition-all`}>
              <CardHeader className="pb-2">
                <div className={`p-2 w-fit rounded-lg ${feature.bgColor} mb-3`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-base font-semibold">{feature.title}</CardTitle>
                <span className={`text-xs ${feature.color} font-medium`}>{feature.tag}</span>
              </CardHeader>
              <CardContent className="text-zinc-400 text-sm leading-relaxed">
                {feature.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-white font-extrabold">
            Built for creators who are serious about growth
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center space-y-3 p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex justify-center">
                <div className="p-3 rounded-full bg-purple-500/10 border border-purple-500/20">
                  <benefit.icon className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <h3 className="text-white font-semibold text-lg">{benefit.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing CTA */}
      <div id="pricing" className="text-center py-12 px-6 rounded-3xl bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-white/10">
        <h2 className="text-3xl md:text-4xl text-white font-extrabold mb-4">
          Start creating today for only $19.99/month
        </h2>
        <p className="text-zinc-400 text-lg mb-2">
          5 free generations — no credit card required. Cancel anytime.
        </p>
      </div>

    </div>
  );
};

export default LandingContent;
