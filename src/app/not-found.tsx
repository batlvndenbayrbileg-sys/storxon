import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "Олдсонгүй — Storxon" };

const links = [
  { href: "/", label: "Нүүр хуудас", primary: true },
  { href: "/dashboard", label: "Самбар" },
  { href: "/playground", label: "Playground" },
  { href: "/login", label: "Нэвтрэх" },
];

export default function NotFound() {
  return (
    <main className="soft-bg grid min-h-screen place-items-center px-4 py-10 text-center">
      <div className="flex flex-col items-center">
        <Image
          src="/mascot-hello.webp"
          alt="Storxon робот"
          width={870}
          height={825}
          className="edge-fade animate-float h-auto w-48 select-none sm:w-60"
        />
        <p className="text-brand mt-2 text-7xl font-black tracking-tight sm:text-8xl">404</p>
        <h1 className="mt-4 text-2xl font-black tracking-tight">Хуудас олдсонгүй</h1>
        <p className="mx-auto mt-3 max-w-sm text-muted">
          Таны хайсан хуудас байхгүй эсвэл зөөгдсөн байна. Доорх холбоосоор үргэлжлүүлээрэй.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                l.primary
                  ? "rounded-full bg-brand px-5 py-3 text-sm font-semibold shadow-md shadow-violet-500/25 hover:opacity-90"
                  : "rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold hover:border-violet-300"
              }
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
