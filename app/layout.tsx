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
    <html
      lang="en"
      suppressHydrationWarning
    >

      <head>

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
          rel="stylesheet"
        />

      </head>

      <body
        className="
        antialiased
        overflow-x-hidden
      "
        style={{
          minHeight: "100vh",

          position: "relative",

          zIndex: 0,

          fontFamily:
            "'Inter',sans-serif",

          background:
            "#050816",

          color:
            "#F8FAFC",
        }}
      >

        {children}

      </body>

    </html>
  );
}