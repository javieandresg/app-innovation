"use client";

import { useAuth } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const font = Montserrat({ weight: "700", subsets: ["latin"] });

export const LandingNabvbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md border-b border-white/5"
      style={{ background: "rgba(5, 5, 16, 0.8)" }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-x-3 group">
        <div className="relative h-8 w-8 rounded-lg overflow-hidden ring-1 ring-white/10 group-hover:ring-purple-500/50 transition-all">
          <Image fill src="/logo.svg" alt="Logo" />
        </div>
        <h1 className={cn("text-xl font-bold text-white", font.className)}>
          innovation
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">.ia</span>
        </h1>
      </Link>

      {/* Links centro */}
      <div className="hidden md:flex items-center gap-x-6 text-sm text-zinc-400">
        <Link href="#features" className="hover:text-white transition-colors relative group">
          Features
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300" />
        </Link>
        <Link href="#pricing" className="hover:text-white transition-colors relative group">
          Pricing
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300" />
        </Link>
      </div>

      {/* Botones */}
      <div className="flex items-center gap-x-3">
        {isSignedIn ? (
          <Link href="/dashboard">
            <Button className="rounded-full bg-white text-black hover:bg-zinc-200 font-semibold px-5">
              Dashboard
            </Button>
          </Link>
        ) : (
          <>
            <Link href="/sign-in">
              <Button variant="ghost" className="rounded-full text-zinc-300 hover:text-white hover:bg-white/10 px-5">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-5 shadow-lg shadow-purple-500/25">
                Get Started Free
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
