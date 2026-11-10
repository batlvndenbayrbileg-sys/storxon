"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function PlaygroundError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-bold text-paper">Алдаа гарлаа</h1>
      <p className="mt-3 text-muted">
        Хичээлийг ачаалах үед гэнэтийн алдаа гарлаа. Дахин оролдох эсвэл хичээлийн жагсаалт руу буцна уу.
      </p>
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => retry()}
          className="rounded-lg bg-volt px-5 py-2.5 font-semibold text-volt-ink"
        >
          Дахин оролдох
        </button>
        <Link
          href="/playground"
          className="rounded-lg border border-line px-5 py-2.5 font-semibold text-paper"
        >
          Жагсаалт руу
        </Link>
      </div>
    </main>
  );
}
