import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LessonView from "@/components/learn/LessonView";
import { LESSONS, getLesson } from "@/lib/lessons/data";

export function generateStaticParams() {
  return LESSONS.map((l) => ({ id: l.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const lesson = getLesson(id);
  if (!lesson) return {};
  const description = lesson.objectives.length
    ? lesson.objectives.slice(0, 3).join(" · ")
    : `${lesson.title} — Storxon интерактив хичээл`;
  return { title: lesson.title, description };
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = getLesson(id);
  if (!lesson) notFound();
  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10 [color-scheme:light_dark] dark:bg-zinc-950">
      <LessonView lesson={lesson} hrefBase="/playground" />
    </main>
  );
}
