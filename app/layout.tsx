import "./globals.css";
import type { Metadata } from "next";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: [
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
  ],
});

export const metadata: Metadata = {
  title: "AI Powered Digital Notice Board",
  description:
    "Modern AI Powered Digital Notice Board with Smart Search Assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${poppins.className}
          min-h-screen
          antialiased
          text-slate-900
        `}
      >
        {/* Floating Background Shapes */}

        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div
            className="
              absolute
              top-[-150px]
              left-[-150px]
              h-[400px]
              w-[400px]
              rounded-full
              bg-indigo-400/15
              blur-3xl
              animate-float
            "
          />

          <div
            className="
              absolute
              top-[10%]
              right-[-120px]
              h-[350px]
              w-[350px]
              rounded-full
              bg-purple-400/15
              blur-3xl
              animate-float
            "
          />

          <div
            className="
              absolute
              bottom-[-150px]
              left-[35%]
              h-[450px]
              w-[450px]
              rounded-full
              bg-cyan-400/15
              blur-3xl
              animate-float
            "
          />
        </div>

        {children}
      </body>
    </html>
  );
}