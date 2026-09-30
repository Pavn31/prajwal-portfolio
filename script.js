/* =========================================================
   PRAJWAL PORTFOLIO — MAIN SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     NAVBAR
  ======================================================= */

  const navbar = document.querySelector(".navbar");

  function updateNavbar() {
    if (!navbar) return;

    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateNavbar, { passive: true });
  updateNavbar();

  /* =======================================================
     THEME TOGGLE
  ======================================================= */

  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.querySelector(".theme-icon");

  function applyTheme(theme) {
    const isDark = theme === "dark";

    document.body.classList.toggle("dark", isDark);

    if (themeIcon) {
      themeIcon.textContent = isDark ? "☀" : "☾";
    }

    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme",
      );
    }
  }

  const savedTheme = localStorage.getItem("prajwal-theme");

  if (savedTheme === "dark") {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark");
      const nextTheme = isDark ? "light" : "dark";

      applyTheme(nextTheme);
      localStorage.setItem("prajwal-theme", nextTheme);
    });
  }

  /* =======================================================
     SMOOTH NAVIGATION
  ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  /* =======================================================
     ACTIVE NAVIGATION LINK
  ======================================================= */

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

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
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

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
          if (!entry.isIntersecting) {
            return;
          }

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

  /* =======================================================
     BACK TO TOP
  ======================================================= */

  const backToTop = document.getElementById("backToTop");

  function updateBackToTop() {
    if (!backToTop) {
      return;
    }

    if (window.scrollY > 600) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
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

  /* =======================================================
     ECG ANIMATION
  ======================================================= */

  const ecgCard = document.querySelector(".ecg-card");
  const ecgLine = document.querySelector(".ecg-card polyline");

  if (ecgLine) {
    ecgLine.style.animation = "none";

    requestAnimationFrame(() => {
      ecgLine.style.animation = "";
      ecgLine.style.animationPlayState = "running";
    });
  }

  /* =======================================================
     PAUSE ECG WHEN OFF SCREEN
  ======================================================= */

  if (ecgCard && ecgLine && "IntersectionObserver" in window) {
    const ecgObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ecgLine.style.animationPlayState = "running";
          } else {
            ecgLine.style.animationPlayState = "paused";
          }
        });
      },
      {
        threshold: 0.1,
      },
    );

    ecgObserver.observe(ecgCard);
  }

  /* =======================================================
     PAGE LOAD
  ======================================================= */

  document.body.classList.add("page-loaded");
});
