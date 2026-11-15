/**
 * Site-wide client entry. Loaded once; re-initialises page-scoped behaviour
 * after every client-side navigation.
 */
import {
  initDocumentListeners,
  initInteractiveCards,
  initMagneticLinks,
  initRevealSections,
} from "./interactions";
import { mountVisuals, unmountVisuals } from "@/visuals/mount";

let navListenersReady = false;

function initNav() {
  const syncLogo = () => {
    const logo = document.getElementById("logo");
    if (logo) logo.toggleAttribute("data-scrolled", window.scrollY > 100);
  };
  syncLogo();

  if (navListenersReady) return;
  navListenersReady = true;

  window.addEventListener("scroll", syncLogo, { passive: true });

  // Delegated, because the header is replaced on every navigation.
  document.addEventListener("click", (event) => {
    const button = (event.target as HTMLElement).closest<HTMLElement>(
      "#mobile-menu-btn",
    );
    if (!button) return;
    const menu = document.getElementById("mobile-menu");
    const open = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(open));
    menu?.classList.toggle("hidden", !open);
  });
}

function initPage() {
  initDocumentListeners();
  initNav();
  initRevealSections();
  initMagneticLinks();
  initInteractiveCards();
  mountVisuals();
}

// Fires on the first load and after every client-side navigation.
document.addEventListener("astro:page-load", initPage);
document.addEventListener("astro:before-swap", () => unmountVisuals());
