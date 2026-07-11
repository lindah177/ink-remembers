// js/data.js
// Owned by: Narrative Writer
//
// Add one object per event. Each event needs:
//   id, title, letters: [{ witness, inkColor, text, clueWords }, ...], corkboardTemplate
//
// corkboardTemplate uses {0}, {1}, {2}... referring to clueWords in the order
// they appear across this event's letters (letters[0].clueWords first, then
// letters[1].clueWords, and so on). Any clue word the player didn't catch
// gets swapped for an ink blot automatically — you don't need to handle that.
//
// clueWords must be lowercase, single words, spelled exactly as they appear
// in the letter text (punctuation is stripped automatically when matching).

const GAME_DATA = {
  events: [
    {
       id: "breakfast",
      title: "The Last Breakfast",
      letters: [
        {
          witness: "Mara Hale",
          inkColor: "#4a3018",
          text: "When I woke up, Josiah was burning letters in the fireplace. There was ash on his sleeve. Before he left, he placed our mother's ring in my hand without saying a word.",
          clueWords: ["letters", "ring"]
        },
        {
          witness: "Tom Reyes",
          inkColor: "#2b3a4a",
          text: "I arrived early that morning. Josiah was packing a bag by the window. When he noticed me, he slipped a second ring into his pocket. He didn't say much.",
          clueWords: ["bag", "pocket"]
        }
      ],
      corkboardTemplate: "Mara saw him burn {0} and give her the {1}. Tom arrived early and saw him packing a {2}, hiding a second ring in his {3}."
    },
    {

     id: "argument",
      title: "The Argument",
      letters: [
        {
          witness: "Corwin Vane",
          inkColor: "#5a1f1f",
          text: "A stranger came by that day, but he left before the argument started. I had been in the back room, and when I came back, Josiah was already angry.",
          clueWords: ["stranger", "returned"]
        },
        {
          witness: "Tom Reyes",
          inkColor: "#2b3a4a",
          text: "I was standing outside the door. The stranger was still inside when someone shouted Halvard's name. A chair scraped across the floor, and then everything went quiet.",
          clueWords: ["halvard", "silence"]
        }
      ],
      corkboardTemplate: "Corwin says the {0} left before the fight, and he only {1} afterward. Tom heard {2}'s name shouted while the stranger was still inside, then {3}."
    },

    
    {
      id: "docks",
      title: "Last Seen at the Docks",
      letters: [
        {
          witness: "Tom Reyes",
          inkColor: "#2b3a4a",
          text: "I saw Josiah at the docks just after midnight. He wasn't alone. The man with him wore a grey coat and wasn't carrying a lantern.",
          clueWords: ["midnight", "grey"]
        },
        {
          witness: "Corwin Vane",
          inkColor: "#5a1f1f",
          text: "I wasn't anywhere near the harbor that night. I stayed at the tavern by myself. I had debts to worry about, not trips to the docks.",
          clueWords: ["tavern", "debt"]
        }
      ],
      corkboardTemplate: "Tom saw Josiah near the docks around {0} and noticed a {1} coat. Corwin claims he was at the {2}, worried about a {3}."
    },
    {
       id: "letter-to-self",
      title: "The Letter He Sent Himself",
      letters: [
        {
          witness: "Mara Hale",
          inkColor: "#4a3018",
          text: "We searched his desk together. Behind the ledger I found a coded list with names and numbers written in cipher. Tom looked away as soon as I picked it up.",
          clueWords: ["coded", "cipher"]
        },
        {
          witness: "Tom Reyes",
          inkColor: "#2b3a4a",
          text: "We searched the desk together. I found the same list, but it wasn't coded at all. It was written clearly and gave directions to the coast. Mara must have misunderstood it.",
          clueWords: ["plain", "directions"]
        }
      ],
      corkboardTemplate: "Mara found a {0} list in {1}. Tom says it was {2} writing, with {3} to the coast. They cannot both be right."
    },

    {
    id: "search",
      title: "The Search",
      letters: [
        {
          witness: "Corwin Vane",
          inkColor: "#5a1f1f",
          text: "Mara and I forced open the shed. Behind a coil of rope, I found a sealed letter. Mara was checking the window, so I slipped the letter into my coat.",
          clueWords: ["lock", "sealed"]
        },
        {
          witness: "Mara Hale",
          inkColor: "#4a3018",
          text: "We searched the shed together. Josiah's compass was sitting on the windowsill. It looked like someone had placed it there on purpose. When I looked at Corwin, he quickly turned away.",
          clueWords: ["compass", "placed"]
        }
      ],
      corkboardTemplate: "Corwin and Mara forced the {0} together. Corwin found a {1} letter and hid it. Mara found the {2}, deliberately {3}, and saw Corwin flinch."
    },

  ],

  ending: {
    text: "Whoever finds this, I am sorry. By the time you read this I will be gone. I had to disappear to escape a debt that would never let me live in peace. Please do not look for me. If I ever reach safety, I will write again.",
    clueWords: ["disappear", "follow", "safe"],
    threshold: 6, // total clue words caught across the WHOLE game needed for the resolved ending
    resolvedLine: "Resolved Josiah: I made it safely on Aldern Island. Let the dept chase the man they think is dead.",
    unresolvedLine: "Unresolved Josiah:  I am gone now. For now that is all I can leave behind."
  }
};
