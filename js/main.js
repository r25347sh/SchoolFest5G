/**
 * G⁵ Casino - Main Script
 * Ambient particles, nav, smooth interactions
 */
(function () {
  "use strict";

  /* ---------- Ambient particles ---------- */
  function initAmbient() {
    var container = document.getElementById("ambient");
    if (!container) return;

    var colors = ["pink", "cyan", "gold"];
    var count = window.innerWidth < 640 ? 12 : 22;

    for (var i = 0; i < count; i++) {
      var p = document.createElement("span");
      p.className = "g5-ambient-particle " + colors[i % colors.length];
      var size = 2 + Math.random() * 4;
      p.style.width = size + "px";
      p.style.height = size + "px";
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDuration = 12 + Math.random() * 18 + "s";
      p.style.animationDelay = Math.random() * 12 + "s";
      container.appendChild(p);
    }
  }

  /* ---------- Nav ---------- */
  function initNav() {
    var nav = document.getElementById("site-nav");
    var toggle = document.getElementById("nav-toggle");
    var links = document.getElementById("nav-links");
    if (!nav) return;

    window.addEventListener("scroll", function () {
      if (window.scrollY > 40) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    }, { passive: true });

    if (toggle && links) {
      toggle.addEventListener("click", function () {
        toggle.classList.toggle("active");
        links.classList.toggle("open");
      });

      links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          toggle.classList.remove("active");
          links.classList.remove("open");
        });
      });
    }

    // Active section highlight
    var sections = document.querySelectorAll("section[id]");
    if (sections.length && links) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var id = entry.target.getAttribute("id");
              links.querySelectorAll("a").forEach(function (a) {
                a.classList.toggle("active", a.getAttribute("href") === "#" + id);
              });
            }
          });
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      sections.forEach(function (s) {
        observer.observe(s);
      });
    }
  }

  /* ---------- Reveal on scroll (subtle) ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".card, .game-card, .rules-block, .info-card");
    if (!els.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach(function (el, i) {
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
      el.style.transition = "opacity 0.55s ease " + (i % 4) * 0.06 + "s, transform 0.55s var(--ease-out, ease) " + (i % 4) * 0.06 + "s";
      observer.observe(el);
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initAmbient();
    initNav();
    initReveal();
  });
})();
