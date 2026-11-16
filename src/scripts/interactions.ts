/**
 * Small page interactions. Every initialiser is safe to call again after a
 * client-side navigation: per-element work is guarded by a data attribute and
 * document-level listeners are attached only once.
 */
import { decodeText } from "./decode";
import { playLoop } from "./video";

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let revealObserver: IntersectionObserver | null = null;

/** Fade sections in as they enter the viewport and decode their titles. */
export function initRevealSections() {
  revealObserver?.disconnect();
  const sections = document.querySelectorAll<HTMLElement>(
    "[data-reveal-section]",
  );

  if (!("IntersectionObserver" in window) || reducedMotion()) {
    sections.forEach((section) => section.classList.add("is-revealed"));
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const section = entry.target as HTMLElement;
        section.classList.add("is-revealed");
        section
          .querySelectorAll<HTMLElement>("[data-decode]")
          .forEach((element) => decodeText(element));
        observer.unobserve(section);
      });
    },
    { threshold: 0.12 },
  );

  sections.forEach((section) => {
    if (!section.classList.contains("is-revealed"))
      revealObserver?.observe(section);
  });
}

/** Links that lean a few pixels toward the cursor. */
export function initMagneticLinks() {
  if (reducedMotion()) return;
  document
    .querySelectorAll<HTMLElement>("[data-magnetic-link]")
    .forEach((link) => {
      if (link.dataset.magneticReady === "true") return;
      link.dataset.magneticReady = "true";

      link.addEventListener("pointermove", (event) => {
        if (event.pointerType !== "mouse") return;
        const bounds = link.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 6;
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 6;
        link.style.setProperty("--magnetic-x", `${x.toFixed(2)}px`);
        link.style.setProperty("--magnetic-y", `${y.toFixed(2)}px`);
      });

      link.addEventListener("pointerleave", () => {
        link.style.setProperty("--magnetic-x", "0px");
        link.style.setProperty("--magnetic-y", "0px");
      });
    });
}

const MAX_TILT = 6;
/** Matches the card video fade-out in global.css. */
const VIDEO_FADE_OUT = 420;

/** Project cards: 3D tilt, glare, and the preview video on hover or focus. */
export function initInteractiveCards() {
  const reduced = reducedMotion();
  document
    .querySelectorAll<HTMLElement>("[data-interactive-card]")
    .forEach((card) => {
      if (card.dataset.interactiveReady === "true") return;
      card.dataset.interactiveReady = "true";

      const video = card.querySelector<HTMLVideoElement>(
        "video[data-card-video]",
      );
      if (video && !reduced) {
        // The loop fades in through scanlines (CSS) only once it is really
        // playing, so a slow first load never shows a black frame. On leave
        // it fades out first and pauses afterwards.
        let wanted = false;
        let stopTimer = 0;
        const play = () => {
          wanted = true;
          window.clearTimeout(stopTimer);
          playLoop(video).then((started) => {
            if (started && wanted) card.dataset.playing = "true";
            else if (!wanted) video.pause();
          });
        };
        const pause = () => {
          wanted = false;
          delete card.dataset.playing;
          window.clearTimeout(stopTimer);
          stopTimer = window.setTimeout(() => {
            if (!wanted) video.pause();
          }, VIDEO_FADE_OUT);
        };
        card.addEventListener("pointerenter", (event) => {
          if (event.pointerType === "mouse") play();
        });
        card.addEventListener("pointerleave", pause);
        // Keyboard focus only: focus handed back after closing a devlog
        // must not reopen the card.
        card.addEventListener("focusin", (event) => {
          if ((event.target as Element).matches(":focus-visible")) play();
        });
        card.addEventListener("focusout", (event) => {
          if (!card.contains(event.relatedTarget as Node | null)) pause();
        });
      }

      if (reduced) return;

      let frame = 0;
      let bounds: DOMRect | null = null;
      let pointerX = 0;
      let pointerY = 0;

      card.addEventListener("pointermove", (event) => {
        if (event.pointerType !== "mouse") return;
        bounds ||= card.getBoundingClientRect();
        pointerX = Math.max(
          0,
          Math.min(1, (event.clientX - bounds.left) / bounds.width),
        );
        pointerY = Math.max(
          0,
          Math.min(1, (event.clientY - bounds.top) / bounds.height),
        );
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          const x = (pointerX - 0.5) * 2;
          const y = (pointerY - 0.5) * 2;
          card.style.setProperty(
            "--card-rotate-x",
            `${(-y * MAX_TILT).toFixed(2)}deg`,
          );
          card.style.setProperty(
            "--card-rotate-y",
            `${(x * MAX_TILT).toFixed(2)}deg`,
          );
          card.style.setProperty(
            "--card-glare-x",
            `${(pointerX * 100).toFixed(1)}%`,
          );
          card.style.setProperty(
            "--card-glare-y",
            `${(pointerY * 100).toFixed(1)}%`,
          );
        });
      });

      card.addEventListener("pointerleave", () => {
        bounds = null;
        if (frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
        card.style.setProperty("--card-rotate-x", "0deg");
        card.style.setProperty("--card-rotate-y", "0deg");
        card.style.setProperty("--card-glare-x", "50%");
        card.style.setProperty("--card-glare-y", "50%");
      });
    });
}

let documentListenersReady = false;

/** Listeners that live on the document and survive client-side navigation. */
export function initDocumentListeners() {
  if (documentListenersReady) return;
  documentListenersReady = true;

  // Accordions (home dropdowns and the Q&A list).
  document.addEventListener("click", (event) => {
    const toggle = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-accordion-toggle]",
    );
    if (!toggle) return;
    const panel = document.getElementById(
      toggle.getAttribute("aria-controls") || "",
    );
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    panel?.classList.toggle("hidden", expanded);
  });

  // Copy-to-clipboard buttons. Messages come translated in the markup:
  // <button data-copy="text" data-copy-success="…" data-copy-error="…"
  //         data-copy-feedback="id-of-status-element">
  let feedbackTimer = 0;
  document.addEventListener("click", async (event) => {
    const button = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-copy]",
    );
    if (!button) return;
    const feedback = document.getElementById(button.dataset.copyFeedback || "");
    try {
      await navigator.clipboard.writeText(button.dataset.copy || "");
      if (feedback) feedback.textContent = button.dataset.copySuccess || "";
    } catch {
      if (feedback) feedback.textContent = button.dataset.copyError || "";
    }
    window.clearTimeout(feedbackTimer);
    feedbackTimer = window.setTimeout(() => {
      if (feedback) feedback.textContent = "";
    }, 2500);
  });

  // Remember the language the visitor picks (read by the inline script in
  // BaseHead on their next visit).
  document.addEventListener("click", (event) => {
    const link = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-lang-link]",
    );
    if (!link) return;
    try {
      localStorage.setItem("lang", link.dataset.langLink || "en");
    } catch {
      // Storage unavailable: the choice is simply not remembered.
    }
  });

  // A few binary digits scatter from each mouse press.
  if (reducedMotion()) return;
  window.addEventListener(
    "pointerdown",
    (event) => {
      if (event.pointerType !== "mouse") return;
      for (let index = 0; index < 6; index += 1) {
        const glyph = document.createElement("span");
        const angle = (Math.PI * 2 * index) / 6 + (Math.random() - 0.5) * 0.35;
        const distance = 18 + Math.random() * 20;
        glyph.className = "binary-burst-glyph";
        glyph.setAttribute("aria-hidden", "true");
        glyph.textContent = Math.random() > 0.5 ? "1" : "0";
        glyph.style.left = `${event.clientX}px`;
        glyph.style.top = `${event.clientY}px`;
        glyph.style.setProperty("--burst-x", `${Math.cos(angle) * distance}px`);
        glyph.style.setProperty("--burst-y", `${Math.sin(angle) * distance}px`);
        document.body.appendChild(glyph);
        window.setTimeout(() => glyph.remove(), 650);
      }
    },
    { passive: true },
  );
}
