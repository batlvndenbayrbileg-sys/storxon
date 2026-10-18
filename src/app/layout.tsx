import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://storxon.online"),
  title: "Storxon — Өөрийн онлайн дэлгүүрийг 0-ээс бүтээ",
  description:
    "Програмчлалын мэдлэггүй ч 6 долоо хоногт QPay-ээр төлбөр авдаг, өөрийн домэйнтой онлайн дэлгүүртэй болно. Урьдчилсан бүртгэл -50%.",
  openGraph: {
    title: "Storxon — Өөрийн онлайн дэлгүүрийг 0-ээс бүтээ",
    description:
      "Next.js, Supabase, QPay, AI туслах. 10 модуль, бүрэн эх код, бодит дэлгүүр.",
    url: "https://storxon.online",
    siteName: "Storxon",
    locale: "mn_MN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mn" className="h-full scroll-smooth antialiased">
      <body className="min-h-full bg-ink text-paper">{children}</body>
    </html>
  );
}
