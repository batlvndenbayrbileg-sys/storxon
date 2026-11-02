import type { Metadata } from "next";

export const metadata: Metadata = { title: "Бүртгэл үүсгэх", robots: { index: false } };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
