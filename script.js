// ============================================================
// JAGĀ SECURITY — landing script
// Menú mobile + flecha "Volver arriba". Sin dependencias externas.
// ============================================================

(function () {
  "use strict";

  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");

  function closeMenu() {
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "[ MENÚ ]";
  }

  function openMenu() {
    links.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.textContent = "[ CERRAR ]";
  }

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.contains("is-open");
      if (isOpen) { closeMenu(); } else { openMenu(); }
    });

    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  // Flecha "Volver arriba": aparece después de una pantalla de scroll (cuando el comienzo ya no se ve,
  // en cualquier dispositivo). Lleva al tope y deja el foco en el logo del encabezado (#arriba).
  // Suave solo sin movimiento reducido.
  var toTop = document.getElementById("volver-arriba");
  var topTarget = document.getElementById("arriba");
  if (toTop) {
    var ticking = false;
    var updateToTop = function () {
      ticking = false;
      toTop.classList.toggle("is-visible", window.scrollY > window.innerHeight);
    };
    var requestUpdate = function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(updateToTop); }
    };
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    updateToTop();

    toTop.addEventListener("click", function (e) {
      e.preventDefault();
      var smooth = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
      try { window.scrollTo({ top: 0, left: 0, behavior: smooth ? "smooth" : "instant" }); }
      catch (err) { window.scrollTo(0, 0); }
      if (topTarget) topTarget.focus({ preventScroll: true });
    });
  }
})();
