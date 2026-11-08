import { Palette, ShoppingCart, Sparkles, LayoutDashboard, FileText, MousePointerClick } from "lucide-react";

/**
 * Landing "Сурагчдын жишээ ажлууд" gallery — static, no data fetching.
 * These are sample projects a learner can build by the end of the course
 * (illustrative, not real student submissions).
 */
const WORKS = [
  { icon: Palette, title: "Хувийн портфолио", body: "Өөрийн танилцуулга, ур чадвар, холбоо барих хэсэгтэй нэг хуудас сайт.", tags: ["HTML", "CSS"], tone: "from-violet-100 to-violet-50" },
  { icon: ShoppingCart, title: "Жижиг дэлгүүр", body: "Бүтээгдэхүүний карт, сагс, QPay төлбөрийн урсгалтай онлайн дэлгүүр.", tags: ["JS", "E-commerce"], tone: "from-amber-100 to-amber-50" },
  { icon: MousePointerClick, title: "Интерактив тооцоолуур", body: "Үнэ, хөнгөлөлтийг товч дарахад шууд бодож харуулдаг жижиг апп.", tags: ["JS", "DOM"], tone: "from-sky-100 to-sky-50" },
  { icon: LayoutDashboard, title: "Захиалгын самбар", body: "Захиалгын жагсаалт, төлөв шүүлтүүртэй React-ийн жижиг самбар.", tags: ["React", "useState"], tone: "from-emerald-100 to-emerald-50" },
  { icon: FileText, title: "Бизнес лэндинг", body: "Давуу тал, үнэ, FAQ-тай мобайлд тохирсон борлуулалтын хуудас.", tags: ["Flexbox", "Responsive"], tone: "from-rose-100 to-rose-50" },
  { icon: Sparkles, title: "Анимэйшнтэй карт", body: "Hover болон transition ашигласан гоёмсог бүтээгдэхүүний карт.", tags: ["CSS", "Transition"], tone: "from-indigo-100 to-indigo-50" },
];

export default function WorkGallery() {
  return (
    <section id="gallery" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20" aria-labelledby="gallery-title">
      <div className="reveal mx-auto mb-10 max-w-2xl text-center sm:mb-12">
        <p className="mb-4 inline-block rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">Жишээ ажлууд</p>
        <h2 id="gallery-title" className="text-3xl font-black tracking-tight sm:text-4xl">Сургалтын төгсгөлд бүтээх зүйлс</h2>
        <p className="mt-4 text-muted">Доорх нь сургалтаар бүтээж болох жишээ төслүүд юм.</p>
      </div>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {WORKS.map((w, i) => (
          <li key={w.title} data-d={`${i * 60}ms`} className="reveal overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/10">
            <div aria-hidden className={`grid h-32 place-items-center bg-gradient-to-br ${w.tone}`}>
              <w.icon className="size-10 text-violet-600" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold">{w.title}</h3>
              <p className="mt-2 text-sm text-muted">{w.body}</p>
              <p className="mt-4 flex flex-wrap gap-2">
                {w.tags.map((t) => (
                  <span key={t} className="rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-700">{t}</span>
                ))}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
