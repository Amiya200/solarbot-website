import { useEffect } from "react";

export default function useHeroCounter() {
  useEffect(() => {
    const counters = document.querySelectorAll("[data-count]");

    counters.forEach((counter) => {
      const target = Number(counter.dataset.count);
      const suffix = counter.dataset.suffix || "";

      let value = 0;
      const step = target / 50;

      const interval = setInterval(() => {
        value += step;

        if (value >= target) {
          value = target;
          clearInterval(interval);
        }

        counter.textContent = Math.round(value) + suffix;
      }, 30);
    });
  }, []);
}