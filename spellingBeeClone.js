`use strict`

// universal consts
const ALPHABET = Array.from("ABCDEFGHIJKLNNOPQRSTUVWXYZ");

// game vars
const letters = []; // index 0 is center letter, rest start at top and go around
const wordsFound = [];
let score = 0;

init_game();

function init_game() {

}


function pick_letters() {
    // TODO: assign all letters

    for (let i = 0; i < 7; i++) {
        do {
            letters[i] = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
        } while (letters.slice(0, i).includes(letters[i]));
    }
}
