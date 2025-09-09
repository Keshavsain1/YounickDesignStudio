// src/hooks/useReveal.tsx
import { useEffect, useRef, useState } from "react";

export default function useReveal<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // If you want it to reveal only once, unobserve after visible
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, ...options }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [ref, options]);

  return { ref, isVisible };
}
