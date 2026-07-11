// js/app.js
// Owned by: Systems/Integration
//
// Wires data.js + engine.js + corkboard.js into a playable loop.
// Tracks which event/letter is active and the running clue-word tally
// across the whole game.

let currentEventIndex = 0;
let currentLetterIndex = 0;
let clueTally = []; // clue words caught across the WHOLE game so far
let score = 5;
let isGameOver = false;
let sceneIntroShownForCurrentEvent = false;

const letterContainer = document.getElementById("letter-text");
const corkboardContainer = document.getElementById("corkboard");
const witnessLabel = document.getElementById("witness-label");
const nextBtn = document.getElementById("next-btn");
const scoreValue = document.getElementById("score-value");

let teardownCurrentLetter = null;

function updateScoreDisplay() {
  if (scoreValue) {
    scoreValue.textContent = score;
  }
}

function resetGame() {
  currentEventIndex = 0;
  currentLetterIndex = 0;
  clueTally = [];
  score = 5;
  isGameOver = false;
  sceneIntroShownForCurrentEvent = false;
  updateScoreDisplay();
  witnessLabel.textContent = "A Witness's Account";
  corkboardContainer.classList.add("hidden");
  loadLetter();
}

function showSceneIntro() {
  const event = GAME_DATA.events[currentEventIndex];
  sceneIntroShownForCurrentEvent = true;
  corkboardContainer.classList.add("hidden");
  letterContainer.innerHTML = `
    <div class="scene-intro">
      <p class="scene-label">Scene ${currentEventIndex + 1}</p>
      <h2>${event.title}</h2>
      <p class="scene-copy">The next memory is gathering in the ink. Press begin and read the witness account.</p>
      <button id="begin-scene-btn" class="primary-btn">Begin Scene</button>
    </div>
  `;
  witnessLabel.textContent = event.title;
  nextBtn.disabled = true;

  const beginBtn = document.getElementById("begin-scene-btn");
  if (beginBtn) {
    beginBtn.addEventListener("click", () => {
      loadLetter();
    }, { once: true });
  }
}

function loadLetter() {
  if (isGameOver) return;

  corkboardContainer.classList.add("hidden");

  if (currentLetterIndex === 0 && !sceneIntroShownForCurrentEvent) {
    showSceneIntro();
    return;
  }

  const event = GAME_DATA.events[currentEventIndex];
  const letter = event.letters[currentLetterIndex];
  witnessLabel.textContent = letter.witness;

  if (teardownCurrentLetter) teardownCurrentLetter();
  teardownCurrentLetter = renderLetter(letterContainer, letter, handleCaught, handleLetterComplete);
  updateScoreDisplay();
}

function showGameOver() {
  if (isGameOver) return;

  isGameOver = true;
  if (teardownCurrentLetter) {
    teardownCurrentLetter();
    teardownCurrentLetter = null;
  }

  letterContainer.innerHTML = `
    <div class="scene-intro game-over">
      <p class="scene-label">The Ink Goes Dark</p>
      <h2>Game Over</h2>
      <p class="scene-copy">Your life reached zero. The memory slips away before you can hold it.</p>
      <button id="restart-btn" class="primary-btn">Try Again</button>
    </div>
  `;
  witnessLabel.textContent = "The Ink Goes Dark";
  nextBtn.disabled = true;
  corkboardContainer.classList.add("hidden");

  const restartBtn = document.getElementById("restart-btn");
  if (restartBtn) {
    restartBtn.addEventListener("click", resetGame, { once: true });
  }
}

function handleCaught(word, _caughtSoFar, isClueWord) {
  if (isGameOver) return;

  if (isClueWord) {
    score += 3;
  } else {
    score -= 1;
  }

  updateScoreDisplay();

  if (score <= 0) {
    showGameOver();
  }
}

function handleLetterComplete(caughtWords) {
  if (isGameOver) return;

  const event = GAME_DATA.events[currentEventIndex];
  const letter = event.letters[currentLetterIndex];
  const lowerClues = letter.clueWords.map((c) => c.toLowerCase());

  caughtWords
    .filter((w) => lowerClues.includes(w.toLowerCase()))
    .forEach((w) => clueTally.push(w));

  if (currentLetterIndex < event.letters.length - 1) {
    currentLetterIndex++;
    loadLetter();
  } else {
    showCorkboard();
  }
}

function showCorkboard() {
  const event = GAME_DATA.events[currentEventIndex];
  renderCorkboard(corkboardContainer, event, clueTally);
  corkboardContainer.classList.remove("hidden");
}

function nextEvent() {
  currentEventIndex++;
  currentLetterIndex = 0;
  sceneIntroShownForCurrentEvent = false;

  if (currentEventIndex < GAME_DATA.events.length) {
    loadLetter();
  } else {
    showEnding();
  }
}

function showEnding() {
  const resolved = clueTally.length >= GAME_DATA.ending.threshold;
  // TODO(integration): render the final letter using renderLetter(), same as
  // any other letter, then once it completes swap in resolvedLine or
  // unresolvedLine based on `resolved` and show it as the last screen.
  witnessLabel.textContent = "Josiah Hale";
  letterContainer.innerHTML = "";
  corkboardContainer.classList.add("hidden");
  if (teardownCurrentLetter) teardownCurrentLetter();
  teardownCurrentLetter = renderLetter(
    letterContainer,
    { text: GAME_DATA.ending.text, inkColor: "#2b1f14" },
    handleCaught,
    () => {
      const line = resolved ? GAME_DATA.ending.resolvedLine : GAME_DATA.ending.unresolvedLine;
      corkboardContainer.innerHTML = `<p>${line}</p>`;
      corkboardContainer.classList.remove("hidden");
    }
  );
}

nextBtn.addEventListener("click", () => {
  if (!corkboardContainer.classList.contains("hidden")) {
    nextEvent();
  }
});

updateScoreDisplay();
loadLetter();
