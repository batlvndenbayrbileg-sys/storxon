import { notFound } from "next/navigation";
import LessonView from "@/components/learn/LessonView";
import { LESSONS, getLesson } from "@/lib/lessons/data";

export function generateStaticParams() {
  return LESSONS.map((l) => ({ id: l.id }));
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = getLesson(id);
  if (!lesson) notFound();
  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10 dark:bg-zinc-950">
      <LessonView lesson={lesson} hrefBase="/playground" />
    </main>
  );
}
