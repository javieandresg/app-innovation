import LandingContent from "@/components/landing-content";
import { LandingHero } from "@/components/landing-hero";
import { LandingNabvbar } from "@/components/landing-navbar";
import Link from "next/link";

function LandingPage() {
  return (
    <div className="h-full">
      <LandingNabvbar />
      <LandingHero />
      <LandingContent />
      <footer className="text-center py-8 text-white/30 text-xs space-x-6">
        <Link href="/terms" className="hover:text-white/60 transition">Terms of Service</Link>
        <Link href="/privacy" className="hover:text-white/60 transition">Privacy Policy</Link>
        <Link href="/refund" className="hover:text-white/60 transition">Refund Policy</Link>
      </footer>
    </div>
  );
}

export default LandingPage;
