
  document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  if (!counters.length) return;

  const animateCounter = (counter) => {
    if (!(counter instanceof HTMLElement)) return;

    const targetValue = Number(counter.dataset.target);
    if (Number.isNaN(targetValue)) return;

    let current = 0;
    const increment = Math.max(targetValue / 120, 1);

    const update = () => {
      current += increment;

      if (current < targetValue) {
        counter.textContent = Math.floor(current).toString();
        requestAnimationFrame(update);
      } else {
        counter.textContent = targetValue.toString();
      }
    };

    update();
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target instanceof HTMLElement) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => observer.observe(counter));
});
