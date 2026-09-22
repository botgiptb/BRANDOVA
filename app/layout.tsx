import type { Metadata } from "next";
import "./globals.css";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: "Brandova — Digital Marketing Agency",
  description: "We craft digital experiences that dominate markets, captivate audiences, and drive exponential growth.",
  icons: {
    icon: "/brandova.png",
    shortcut: "/brandova.png",
    apple: "/brandova.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/brandova.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
