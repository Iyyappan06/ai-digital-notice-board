import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Powered Digital Notice Board",

  description:
    "Digital Notice Board with Gemini AI Search Assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <body className="min-h-screen bg-gray-100">

        {children}

      </body>

    </html>
  );
}