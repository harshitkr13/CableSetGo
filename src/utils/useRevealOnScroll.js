import { useEffect } from "react";

export default function useRevealOnScroll(selector = ".reveal") {
  useEffect(() => {
    const els = document.querySelectorAll(selector);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("show");
      });
    }, { threshold: 0.1 });

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector]);
}
