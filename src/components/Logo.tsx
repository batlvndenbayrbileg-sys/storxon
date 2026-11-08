import Image from "next/image";

/**
 * Storxon brand mark — the mascot head (same image as the app icon / lesson
 * pages). Replaces the old "S" letter badge everywhere. Size is controlled by
 * the caller via `className` (e.g. "size-10"); it is decorative by default
 * because a "Storxon" wordmark normally sits beside it.
 */
export default function Logo({
  className = "size-10",
  decorative = true,
}: {
  className?: string;
  decorative?: boolean;
}) {
  return (
    <Image
      src="/kit/head.webp"
      alt={decorative ? "" : "Storxon"}
      aria-hidden={decorative || undefined}
      width={48}
      height={48}
      className={`shrink-0 select-none object-contain ${className}`}
    />
  );
}
