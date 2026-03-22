document.addEventListener("DOMContentLoaded", () => {
  // Disable smooth scroll during page load to prevent the unwanted scroll drift
  document.documentElement.style.scrollBehavior = "auto";
  window.addEventListener("load", () => {
    // Re-enable smooth scroll after everything has settled
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.style.scrollBehavior = "";
      });
    });
  });

  const hero = document.querySelector(".hero");

  if (hero) {
    window.addEventListener("load", () => {
      hero.classList.add("hero--visible");
    });
  }

  function makeObserver(selector, visibleClass, threshold = 0.1) {
    const el = document.querySelector(selector);
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add(visibleClass);
            obs.unobserve(el);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
  }

  makeObserver(".section-wrapper", "section-wrapper--visible");
  makeObserver(".pillars-section", "pillars-section--visible");
  makeObserver(".feature-highlight", "feature-highlight--visible");
  makeObserver(".events-section", "events-section--visible");
  makeObserver(".feature-highlight__second", "feature-highlight__second--visible");
  makeObserver(".site-footer", "is-visible");
});