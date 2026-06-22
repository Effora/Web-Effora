/* ============================================================
   EFFORA — Empresa de Software
   Interacciones de frontend. Sin dependencias.
   ============================================================ */
(function () {
  "use strict";

  var WA_PHONE = "5492236910803";
  var WA_BASE = "https://wa.me/" + WA_PHONE + "?text=";

  function openWhatsApp(text) {
    window.open(WA_BASE + encodeURIComponent(text), "_blank", "noopener,noreferrer");
  }

  function buildWhatsAppFromForm(form) {
    var name = form.querySelector("#name").value.trim();
    var email = form.querySelector("#email").value.trim();
    var companyField = form.querySelector("#company");
    var company = companyField ? companyField.value.trim() : "";
    var interest = form.querySelector("#interest");
    var interestText = interest.options[interest.selectedIndex].text;
    var message = form.querySelector("#message").value.trim();
    var lines = [
      "Hola EFFORA, quiero consultar por un proyecto.",
      "",
      "Nombre: " + name,
      "Email: " + email
    ];
    if (company) lines.push("Empresa: " + company);
    lines.push("Interés: " + interestText);
    lines.push("Mensaje: " + message);
    return lines.join("\n");
  }

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var header = document.getElementById("site-header");
  var scrollTicking = false;

  function updateHeaderScroll() {
    scrollTicking = false;
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 8);
  }

  function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(updateHeaderScroll);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  requestAnimationFrame(updateHeaderScroll);

  var toggle = document.getElementById("nav-toggle");
  var menu = document.getElementById("nav-menu");

  function closeMenu() {
    if (!menu || !toggle) return;
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
    document.body.style.overflow = "";
  }
  function openMenu() {
    if (!menu || !toggle) return;
    menu.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Cerrar menú");
    document.body.style.overflow = "hidden";
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  var autoReveal = document.querySelectorAll(
    ".section-head, .service-card, .process-step, .results-points li, .results-copy, .contact-copy, .contact-form, .project-card, .product-spotlight-copy, .product-spotlight-aside, .project-detail"
  );
  autoReveal.forEach(function (el, i) {
    el.classList.add("reveal");
    el.setAttribute("data-delay", String((i % 4) + 1));
  });

  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");

  function setError(field, message) {
    var wrap = field.closest(".field");
    var err = wrap.querySelector(".field-error");
    wrap.classList.toggle("invalid", Boolean(message));
    if (err) err.textContent = message || "";
  }

  function validateField(field) {
    var value = field.value.trim();
    if (field.hasAttribute("required") && !value) {
      setError(field, "Este campo es obligatorio.");
      return false;
    }
    if (field.type === "email" && value) {
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!ok) { setError(field, "Ingresá un email válido."); return false; }
    }
    setError(field, "");
    return true;
  }

  if (form) {
    var fields = form.querySelectorAll("input, textarea, select");

    fields.forEach(function (field) {
      field.addEventListener("blur", function () { validateField(field); });
      field.addEventListener("input", function () {
        if (field.closest(".field").classList.contains("invalid")) validateField(field);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;
      var firstInvalid = null;
      fields.forEach(function (field) {
        if (!validateField(field)) {
          valid = false;
          if (!firstInvalid) firstInvalid = field;
        }
      });

      if (!valid) {
        if (status) {
          status.textContent = "Revisá los campos marcados.";
          status.className = "form-status err";
        }
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      openWhatsApp(buildWhatsAppFromForm(form));
      if (status) {
        status.textContent = "Te redirigimos a WhatsApp con tu consulta.";
        status.className = "form-status ok";
      }
      form.reset();
      fields.forEach(function (field) { setError(field, ""); });
    });
  }

  var filterBtns = document.querySelectorAll(".filter-btn");
  var projectCards = document.querySelectorAll(".project-card[data-category]");

  var heroVideo = document.getElementById("hero-phone-video");
  var heroAudioBtn = document.getElementById("hero-phone-audio");

  if (heroVideo && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroVideo.play().catch(function () {});
  }

  if (heroVideo && heroAudioBtn) {
    heroAudioBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var willUnmute = heroVideo.muted;
      heroVideo.muted = !willUnmute;
      heroAudioBtn.classList.toggle("is-unmuted", willUnmute);
      heroAudioBtn.setAttribute("aria-pressed", willUnmute ? "true" : "false");
      heroAudioBtn.setAttribute("aria-label", willUnmute ? "Silenciar video" : "Activar audio del video");
      if (willUnmute) {
        heroVideo.play().catch(function () {});
      }
    });
  }

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.getAttribute("data-filter");

        filterBtns.forEach(function (b) {
          var active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-pressed", active ? "true" : "false");
        });

        projectCards.forEach(function (card) {
          var categories = (card.getAttribute("data-category") || "").trim().split(/\s+/);
          var show = filter === "all" || categories.indexOf(filter) !== -1;
          card.classList.toggle("is-hidden", !show);
        });
      });
    });
  }
})();
