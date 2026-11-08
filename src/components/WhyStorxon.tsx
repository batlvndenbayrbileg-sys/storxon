import { Code2, Rocket, Wallet, Smartphone } from "lucide-react";

/** Landing "Яагаад Storxon" — static advantages section, no data fetching. */
const REASONS = [
  { icon: Code2, title: "Хийж сурна", body: "Уншаад зогсохгүй, код засч шууд ажиллуулан үр дүнг нь харна." },
  { icon: Rocket, title: "Бодит төсөл", body: "Модуль бүр жинхэнэ дэлгүүрийн нэг хэсгийг бүтээж дуусгана." },
  { icon: Wallet, title: "Ойлгомжтой үнэ", body: "Нэг удаагийн төлбөр, нуугдмал зардалгүй, курс тань хэвээр үлдэнэ." },
  { icon: Smartphone, title: "Хаанаас ч суралцана", body: "Утас, компьютер дээр ээлтэй; өөрийн хурдаар, өөрт тохирсон цагт." },
];

export default function WhyStorxon() {
  return (
    <section id="why" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20" aria-labelledby="why-title">
      <div className="reveal mx-auto mb-10 max-w-2xl text-center sm:mb-12">
        <p className="mb-4 inline-block rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">Давуу тал</p>
        <h2 id="why-title" className="text-3xl font-black tracking-tight sm:text-4xl">Яагаад Storxon?</h2>
        <p className="mt-4 text-muted">Видео үзээд дуусдаггүй, өөрөө бүтээж сурдаг платформ.</p>
      </div>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {REASONS.map((r, i) => (
          <li key={r.title} data-d={`${i * 70}ms`} className="reveal rounded-3xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/10">
            <span aria-hidden className="mb-5 grid size-12 place-items-center rounded-2xl bg-brand shadow-md shadow-violet-500/25">
              <r.icon className="size-6" />
            </span>
            <h3 className="text-lg font-bold">{r.title}</h3>
            <p className="mt-3 text-sm text-muted">{r.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
