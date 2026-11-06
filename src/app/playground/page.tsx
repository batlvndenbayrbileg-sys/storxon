import LessonView from "@/components/learn/LessonView";
import { HTML_INTRO } from "@/lib/lessons/data";

// Ungated demo of the interactive-lesson experience (one seed lesson).
// Enrolled, DB-backed lessons are served through the gated flow; this route is
// for trying the format and validating the sandbox.
export default function PlaygroundPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10 [color-scheme:light_dark] dark:bg-zinc-950">
      <LessonView lesson={HTML_INTRO} hrefBase="/playground" />
    </main>
  );
}
