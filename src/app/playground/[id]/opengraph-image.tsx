import { ImageResponse } from "next/og";
import { getLesson } from "@/lib/lessons/data";

export const alt = "Storxon интерактив хичээл";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = getLesson(id);
  const title = lesson?.title ?? "Storxon хичээл";
  const goal = lesson?.objectives[0] ?? "Унших · код засах · ажиллуулах";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #09090b 0%, #1e1b4b 100%)",
          color: "#fafafa",
        }}
      >
        <div style={{ display: "flex", fontSize: 36, fontWeight: 700, color: "#a5b4fc" }}>Storxon</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
          <div style={{ display: "flex", fontSize: 34, marginTop: 28, color: "#d4d4d8" }}>{goal}</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa" }}>Интерактив код сурах платформ</div>
      </div>
    ),
    { ...size },
  );
}
