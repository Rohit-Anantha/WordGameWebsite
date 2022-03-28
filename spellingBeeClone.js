`use strict`

document.addEventListener("keydown", handleKeyPress);

// universal consts
const ALPHABET = Array.from("ABCDEFGHIJKLNNOPQRSTUVWXYZ");
const VOWELS = Array.from("AEIOU");

const ctx = canvas.getContext("2d");
ctx.font = "30px Arial";
ctx.textAlign = "center";

const TILE_CONSTS = {
    size: 50, 
    color: "#E0E0E0",
    centerColor: "#FFD700",
    centerCoords: {
        x: 200,
        y: 250
    },
    locationOffsets: [
        {x: 0, y: 0},
        {x: 0, y: -100},
        {x: 87, y: -50},
        {x: 87, y: 50},
        {x: 0, y: 100},
        {x: -87, y: -50},
        {x: -87, y: 50}
    ],
    letterOffsets: {
        x: 0,
        y: 10
    }
}

const GUESS_COORDS = {
    x: 200,
    y: 65
}

const MAX_GUESS_LENGTH = 20;

// game vars
const letters = []; // index 0 is center letter, rest start at top and go around
const wordsFound = [];
let score = 0;
let currentWord = "";

initGame();

function initGame() {
    pickLetters(false);
    console.log(`Letters chosen: ${letters.join(', ')}`);

    drawBlankTiles();
    writeLettersOnTiles();
}

function handleKeyPress(e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        if (currentWord.length < MAX_GUESS_LENGTH) {
            handleLetter(e.keyCode);
            updateText();
        }
    } else if (e.keyCode == 8) {
        currentWord = currentWord.slice(0, -1);
        updateText();
    }
}

function handleLetter(code) {
    const letter = String.fromCharCode(code);

    currentWord += letter;
}

function updateText() {
    clearText();
    ctx.fillStyle = "black";
    ctx.fillText(currentWord, GUESS_COORDS.x, GUESS_COORDS.y);
}

function clearText() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 420, 100);
}

function pickLetters(debuggging_print_letters) {
    let vowelCount = 0;
    for (let i = 0; i < 7; i++) {
        do {
            letters[i] = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
        } while (letters.slice(0, i).includes(letters[i]));
        if (debuggging_print_letters) {
            console.log(`Picked letter ${i} to be ${letters[i]}`);
        }
        
        if (VOWELS.includes(letters[i])) {
            vowelCount++;
            if (debuggging_print_letters) {
                console.log(`${letters[i]} is a vowel, vowel count is now ${vowelCount}`);
            }
        }
    }

    if (vowelCount < 2 || vowelCount > 2) {
        if (debuggging_print_letters) {
            console.log(`Only had ${vowelCount} vowel(s), running pick_letters() again`);
        }
        pickLetters(debuggging_print_letters);
    }
}

function drawBlankTiles() {
    for (let i = 0; i < TILE_CONSTS.locationOffsets.length; i++) {
        drawTile(TILE_CONSTS.locationOffsets[i], i == 0 ? TILE_CONSTS.centerColor : TILE_CONSTS.color);
    }
}

// x and y point to center
function drawTile(offset, color) {
    let hexagon = new Path2D();
    hexagon.moveTo(TILE_CONSTS.centerCoords.x + offset.x + TILE_CONSTS.size * Math.cos(0), TILE_CONSTS.centerCoords.y + offset.y +  TILE_CONSTS.size *  Math.sin(0)); 
    ctx.fillStyle = color;
    
    for (var i = 1; i <= 6; i++) {
        hexagon.lineTo (TILE_CONSTS.centerCoords.x + offset.x + TILE_CONSTS.size * Math.cos(i * 2 * Math.PI / 6), TILE_CONSTS.centerCoords.y + offset.y + TILE_CONSTS.size * Math.sin(i * 2 * Math.PI / 6));
    }

    ctx.fill(hexagon, "nonzero");
}

function writeLettersOnTiles() {
    for (let i = 0; i < TILE_CONSTS.locationOffsets.length; i++) {
        writeOnTile(TILE_CONSTS.locationOffsets[i], letters[i]);
    }
}

function writeOnTile(offset, letter) {
    ctx.fillStyle = "black";
    ctx.fillText(letter, TILE_CONSTS.centerCoords.x + offset.x + TILE_CONSTS.letterOffsets.x, TILE_CONSTS.centerCoords.y + offset.y + TILE_CONSTS.letterOffsets.y);
}

