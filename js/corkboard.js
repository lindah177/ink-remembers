// js/corkboard.js
// Owned by: UI/Visual + Corkboard Builder
//
// Fills an event's corkboardTemplate with caught clue words.
// Any clue word the player never caught renders as an ink blot instead.

// =====================================================
// The Ink Remembers
// Corkboard Renderer
// UI / Visual + Corkboard
//
// Displays the reconstructed memory using the clues
// the player successfully collected.
// Missed clues are replaced with ink blots.
// =====================================================

function renderCorkboard(container, event, allCaughtWords) {

    // Collect every clue from every witness letter
    const allClues = event.letters.flatMap(letter => letter.clueWords);

    // Convert caught words to lowercase for comparison
    const caughtWords = allCaughtWords.map(word => word.toLowerCase());

    let html = event.corkboardTemplate;
    let recovered = 0;

    // Replace each placeholder in the template
    allClues.forEach((clue, index) => {

        const found = caughtWords.includes(clue.toLowerCase());

        if (found) {
            recovered++;
        }

        const replacement = found
            ? `<strong class="revealed-word">${clue}</strong>`
            : `<span class="blot-text">██████</span>`;

        html = html.replace(`{${index}}`, replacement);
    });

    // Build the corkboard
    container.innerHTML = `
        <h2>The Ink Remembers...</h2>

        <p class="memory-progress">
            You recovered <strong>${recovered}</strong> of
            <strong>${allClues.length}</strong> memories.
        </p>

        <div class="memory-summary">
            ${html}
        </div>
    `;

    // Show the corkboard
    container.classList.remove("hidden");

    // Trigger fade-in animation
    requestAnimationFrame(() => {
        container.classList.add("show");
    });

}