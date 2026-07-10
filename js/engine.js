// js/engine.js
// Owned by: Mechanic Engineer
//
// Renders one letter into a container and runs the fade-and-catch loop.
// This file should NOT know about events, corkboards, or overall game state —
// it only ever deals with a single letter at a time. Keep it that way; it's
// what makes this piece reusable and testable on its own.

const FADE_INTERVAL_MS = 1500; // how often a new word starts fading
const FADE_DURATION_MS = 1200; // how long a word takes to fully vanish once it starts

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Renders a letter into `container` with the fade-and-catch mechanic.
 *
 * @param {HTMLElement} container - element to render words into
 * @param {Object} letter - { witness, inkColor, text, clueWords }
 * @param {Function} onCaught - called with (rawWord, allCaughtWordsSoFar) on each catch
 * @param {Function} onComplete - called with (caughtWords) once every word has
 *   either faded away or been caught
 * @returns {Function} teardown - cancels all pending timers (call this before
 *   re-rendering the same container, e.g. on re-read or navigating away)
 */
function renderLetter(container, letter, onCaught, onComplete) {
  const timers = [];
  const caught = [];
  let settledCount = 0;

  container.innerHTML = "";
  container.style.setProperty("--ink-color", letter.inkColor || "#2b1f14");

  const words = letter.text.split(" ");
  const spans = words.map((w) => {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = w;
    span.addEventListener("click", () => catchWord(span, w));
    container.appendChild(span);
    container.appendChild(document.createTextNode(" "));
    return span;
  });

  function checkComplete() {
    settledCount++;
    if (settledCount === spans.length) onComplete(caught);
  }

  function catchWord(span, rawWord) {
    if (span.classList.contains("gone") || span.classList.contains("caught")) return;
    span.classList.add("caught");
    span.style.opacity = "1";
    const cleanWord = rawWord.replace(/[.,!?]/g, "");
    caught.push(cleanWord);
    onCaught(cleanWord, caught);
    checkComplete();
  }

  function startFade(span) {
    if (span.classList.contains("caught")) return;
    span.style.transitionDuration = FADE_DURATION_MS + "ms";
    span.style.opacity = "0";
    const t = setTimeout(() => {
      if (span.classList.contains("caught")) return; // caught mid-fade, leave it
      dropBlot(span);
      span.classList.add("gone");
      checkComplete();
    }, FADE_DURATION_MS);
    timers.push(t);
  }

  function dropBlot(span) {
    const rect = span.getBoundingClientRect();
    const parentRect = container.getBoundingClientRect();
    const blot = document.createElement("div");
    blot.className = "blot";
    blot.style.left = rect.left - parentRect.left - 4 + "px";
    blot.style.top = rect.top - parentRect.top - 2 + "px";
    blot.style.width = rect.width + 8 + "px";
    blot.style.height = rect.height + 6 + "px";
    container.appendChild(blot);
  }

  const fadeOrder = shuffle(spans.map((_, i) => i));
  fadeOrder.forEach((wordIndex, slot) => {
    const t = setTimeout(() => startFade(spans[wordIndex]), slot * FADE_INTERVAL_MS);
    timers.push(t);
  });

  return function teardown() {
    timers.forEach(clearTimeout);
  };
}
