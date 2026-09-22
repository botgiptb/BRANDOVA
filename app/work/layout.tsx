import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work — Brandova",
  description: "Case studies and results from Brandova's client campaigns.",
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
