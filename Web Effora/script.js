const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

const header = document.querySelector(".site-header");
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

const syncHeader = () => {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 18);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}
