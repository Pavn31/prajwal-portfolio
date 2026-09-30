document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     NO-JS FALLBACK
  ========================================================= */

  document.documentElement.classList.remove("no-js");

  /* =========================================================
     NAVBAR
  ========================================================= */

  const navbar = document.querySelector(".navbar");

  function updateNavbar() {
    if (!navbar) return;

    navbar.classList.toggle("scrolled", window.scrollY > 30);
  }

  window.addEventListener("scroll", updateNavbar, {
    passive: true,
  });

  updateNavbar();

  /* =========================================================
     THEME
  ========================================================= */

  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.querySelector(".theme-icon");

  function applyTheme(theme) {
    const dark = theme === "dark";

    document.body.classList.toggle("dark", dark);

    if (themeIcon) {
      themeIcon.textContent = dark ? "☀" : "☾";
    }

    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        dark ? "Switch to light theme" : "Switch to dark theme",
      );
      themeToggle.setAttribute("title", dark ? "Light theme" : "Dark theme");
    }
  }

  const savedTheme = localStorage.getItem("prajwal-theme");

  applyTheme(savedTheme === "dark" ? "dark" : "light");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const dark = document.body.classList.contains("dark");
      const nextTheme = dark ? "light" : "dark";

      applyTheme(nextTheme);
      localStorage.setItem("prajwal-theme", nextTheme);
    });
  }

  /* =========================================================
     SMOOTH SCROLL
  ========================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  /* =========================================================
     ACTIVE NAVIGATION
  ========================================================= */

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => {
            link.classList.remove("active");
          });

          const activeLink = document.querySelector(
            `.nav-links a[href="#${entry.target.id}"]`,
          );

          if (activeLink) {
            activeLink.classList.add("active");
          }
        });
      },
      {
        rootMargin: "-25% 0px -65% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  /* =========================================================
     SCROLL REVEAL
  ========================================================= */

  const revealElements = document.querySelectorAll(`
    .section-header,
    .about-content,
    .timeline-item,
    .education-card,
    .clinical-card,
    .interest-item,
    .volunteer-content,
    .contact-content
  `);

  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
      },
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  /* =========================================================
     BACK TO TOP
  ========================================================= */

  const backToTop = document.getElementById("backToTop");

  function updateBackToTop() {
    if (!backToTop) return;

    backToTop.classList.toggle("visible", window.scrollY > 600);
  }

  window.addEventListener("scroll", updateBackToTop, {
    passive: true,
  });

  updateBackToTop();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* =========================================================
     ECG
  ========================================================= */

  const ecgCard = document.querySelector(".ecg-card");
  const ecgLine = document.querySelector(".ecg-card polyline");

  if (ecgCard && ecgLine && "IntersectionObserver" in window) {
    const ecgObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ecgLine.style.animationPlayState = entry.isIntersecting
            ? "running"
            : "paused";
        });
      },
      {
        threshold: 0.1,
      },
    );

    ecgObserver.observe(ecgCard);
  }

  /* =========================================================
     PAGE READY
  ========================================================= */

  document.body.classList.add("page-loaded");
});
