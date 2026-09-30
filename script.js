/* =========================================================
   NAVBAR
========================================================= */

const navbar = document.querySelector(".navbar");

function updateNavbar() {
  if (!navbar) return;

  if (window.scrollY > 30) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateNavbar);
updateNavbar();

/* =========================================================
   THEME TOGGLE
========================================================= */

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");

const savedTheme = localStorage.getItem("prajwal-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");

  if (themeIcon) {
    themeIcon.textContent = "☀";
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    localStorage.setItem("prajwal-theme", isDark ? "dark" : "light");

    if (themeIcon) {
      themeIcon.textContent = isDark ? "☀" : "☾";
    }
  });
}

/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

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

/* =========================================================
   ACTIVE NAVIGATION LINK
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

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
    threshold: 0.35,
  },
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
  `
  .section-header,
  .about-content,
  .timeline-item,
  .education-card,
  .clinical-card,
  .interest-item,
  .volunteer-content,
  .contact-content
  `,
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
});

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
    threshold: 0.12,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* =========================================================
   BACK TO TOP
========================================================= */

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

window.addEventListener("scroll", updateBackToTop);
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
   ECG ANIMATION
========================================================= */

const ecgLine = document.querySelector(".ecg-card polyline");

if (ecgLine) {
  ecgLine.style.animation = "none";

  requestAnimationFrame(() => {
    ecgLine.style.animation = "";
  });
}

/* =========================================================
   ECG PAUSE WHEN NOT VISIBLE
========================================================= */

const ecgCard = document.querySelector(".ecg-card");

if (ecgCard && ecgLine) {
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

/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener("load", () => {
  document.body.classList.add("page-loaded");
});
