import type { Metadata } from "next";

export const metadata: Metadata = { title: "Олдсонгүй — Storxon" };

export default function NotFound() {
  return (
    <main className="soft-bg grid min-h-screen place-items-center px-4 text-center">
      <div>
        <p className="text-brand text-7xl font-black tracking-tight sm:text-8xl">404</p>
        <h1 className="mt-4 text-2xl font-black tracking-tight">Хуудас олдсонгүй</h1>
        <p className="mx-auto mt-3 max-w-sm text-muted">Таны хайсан хуудас байхгүй эсвэл зөөгдсөн байна.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="/" className="rounded-full bg-brand px-5 py-3 text-sm font-semibold shadow-md shadow-violet-500/25 hover:opacity-90">Нүүр хуудас</a>
          <a href="/dashboard" className="rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold hover:border-violet-300">Самбар</a>
        </div>
      </div>
    </main>
  );
}
