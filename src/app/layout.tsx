import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://storxon.online"),
  title: {
    default: "Storxon — Өөрийн онлайн дэлгүүрийг 0-ээс бүтээ",
    template: "%s — Storxon",
  },
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
    images: [
      {
        url: "/hero-banner.webp",
        width: 1536,
        height: 891,
        alt: "Storxon — Өөрийн онлайн дэлгүүрийг 0-ээс бүтээ",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Storxon — Өөрийн онлайн дэлгүүрийг 0-ээс бүтээ",
    description: "AI-тай хамт онлайн дэлгүүрээ 0-ээс бүтээ. 10 модуль, бодит QPay төлбөр.",
    images: [
      {
        url: "/hero-banner.webp",
        width: 1536,
        height: 891,
        alt: "Storxon — Өөрийн онлайн дэлгүүрийг 0-ээс бүтээ",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mn" className="h-full scroll-smooth antialiased fx" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('sx-theme');if(t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-full bg-ink text-paper">
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: ".reveal{opacity:1!important;transform:none!important}" }} />
        </noscript>
        {children}
      </body>
    </html>
  );
}
