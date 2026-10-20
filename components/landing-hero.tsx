"use client";

import { useAuth } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles } from "lucide-react";

const font = Montserrat({ weight: "700", subsets: ["latin"] });

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="relative py-32 text-center space-y-8 overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-violet-600/15 rounded-full blur-[100px]" />
        <div className="absolute top-1/4 right-1/4 w-[250px] h-[250px] bg-pink-500/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[200px] h-[200px] bg-indigo-500/10 rounded-full blur-[80px]" />
      </div>

      {/* Badge */}
      <div className="flex justify-center">
        <div className="flex items-center gap-x-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-sm backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-purple-400" />
          The AI platform built for content creators
        </div>
      </div>

      {/* Headline */}
      <div className="space-y-4">
        <h1 className={cn("text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight", font.className)}>
          Create viral content
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
            10x faster with AI
          </span>
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
          Generate images, videos, music, captions and code for your content —
          all in one place. Built for creators on Instagram, TikTok and YouTube.
        </p>
      </div>

      {/* Typewriter */}
      <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 text-2xl md:text-3xl font-bold h-10">
        <TypewriterComponent
          options={{
            strings: [
              "Generate YouTube thumbnails in seconds.",
              "Create copyright-free music for Reels.",
              "Write viral captions with AI.",
              "Produce TikTok video clips instantly.",
              "Automate your content workflow.",
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant="premium"
            className="text-base px-8 py-6 rounded-full font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
          >
            Start Creating Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
        <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
          <Button
            variant="outline"
            className="text-base px-8 py-6 rounded-full font-semibold border-white/20 text-white bg-white/5 hover:bg-white/10"
          >
            Sign In
          </Button>
        </Link>
      </div>

      <p className="text-zinc-500 text-sm">
        No credit card required · 5 free generations · Cancel anytime
      </p>
    </div>
  );
};
