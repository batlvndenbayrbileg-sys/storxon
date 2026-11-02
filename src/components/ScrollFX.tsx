"use client";

import { useEffect } from "react";

/**
 * Landing-page scroll effects, progressively enhanced:
 * - reveals: elements with class "reveal" fade/slide in when they enter view
 *   (optional per-element delay via data-d="120ms").
 * - parallax: elements with [data-parallax] drift as you scroll (data-speed).
 * The `fx` class is added to <html> by an inline script in the layout so the
 * hidden state is applied before first paint (no flash); this component only
 * animates. Both are disabled under prefers-reduced-motion.
 */
export default function ScrollFX() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- reveal on scroll ----
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    let io: IntersectionObserver | null = null;
    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("in"));
    } else {
      io = new IntersectionObserver(
        (entries, obs) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              obs.unobserve(e.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      reveals.forEach((el) => {
        if (el.dataset.d) el.style.transitionDelay = el.dataset.d;
        io!.observe(el);
      });
    }

    // ---- parallax ----
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of items) {
        const speed = parseFloat(el.dataset.speed || "0.15");
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const off = (center - vh / 2) * -speed;
        el.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const parallaxOn = !reduce && items.length > 0;
    if (parallaxOn) {
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }

    return () => {
      io?.disconnect();
      if (parallaxOn) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
