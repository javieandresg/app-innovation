import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Chatbot } from "@/components/chatbot";
import { ModalProvider } from "@/components/modal-provider";
import { ToasterProvider } from "@/components/toaster-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "innovation.ia",
  description: "The most advanced AI platform. Generate conversations, images, music, videos and code with AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider proxyUrl={process.env.NEXT_PUBLIC_CLERK_PROXY_URL}>
      <html lang="en">
        <body className={inter.className}>
          <ModalProvider />
          <Chatbot />
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
