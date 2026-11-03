import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Интерактив хичээл",
  robots: { index: false, follow: false },
};

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return children;
}
