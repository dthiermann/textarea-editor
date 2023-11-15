let content = document.getElementById("content");
let displayedCommands = document.getElementById("commands");

content.addEventListener("keydown", handleKey);
content.addEventListener("keyup", save);
window.addEventListener("load", onLoad);

let leftGroupKey = "(";
let rightGroupKey = ")";
let separatorKey = " ";

let mode = "";


function save(event) {
    localStorage.setItem("text", content.value);
    localStorage.setItem("start", content.selectionStart);
    localStorage.setItem("end", content.selectionEnd);

}

function onLoad(event) {
    content.focus();
    content.value = localStorage.getItem("text");

    let start = localStorage.getItem("start");
    let end = localStorage.getItem("end");

    mode = "command";

    content.selectionStart = start;
    content.selectionEnd = end;

}

let commands = new Map();

let enterCommandModeKey = "`";
let enterInsertModeKey = "i";

commands.set("`", doNothing);
commands.set("i", enterInsertMode);
commands.set("j", moveLeftOneChar);
commands.set("k", moveRightOneChar);
commands.set("e", moveBackToSpace);
commands.set("r", moveToNextSpace);
commands.set("s", selectParentExpr);
commands.set("w", selectWord)
commands.set("x", deleteSelection);

function doNothing() {
    return 0;
}

function displayCommands() {
    commands.forEach((value, key) => {
        let row = document.createElement("div");
        row.textContent = `${key}  ${value.name}`;
        displayedCommands.appendChild(row);
    });
}

displayCommands();

function handleKey(event) {
    let key = event.key;
    if (mode == "insert") {
        if (key == enterCommandModeKey) {
            event.preventDefault();
            mode = "command";
        }
        else {
            mode = "insert";
        }
    }
    else if (mode == "command") {
        event.preventDefault();
        if (key == enterInsertModeKey) {
            mode = "insert";
        }
        else {
            command(key);
            mode = "command";
        }
    }
}
// (enterCommandModeKey, insert) --> (do-nothing, command)
// (anyOtherKey, insert) --> (default-action, insert)
// (enterInsertModeKey, command) --> (do-nothing, insert)
// (anyOtherKey, command) --> (do-command, command)
// (key, mode) --> (action, newMode)
// key + (selection, text, mode) --> (newSelection, newText, newMode)

// enterInsertModeKey, command --> preventDefault, insert
// otherKey, command --> preventDefault, command
// enterCommandModeKey, insert --> preventDefault, command
// otherKey, insert --> insert
function selectWord() {
    let start = content.selectionStart;
    let end = content.selectionEnd;
    content.selectionStart = getPreviousOccurence(start, " ") + 1;
    content.selectionEnd = getNextOccurence(end, " ");
}

function command(key) {
    if (commands.has(key)) {
        commands.get(key)();
    }
}

function enterInsertMode() {
    localStorage.setItem("mode", "insert");
}

function moveLeftOneChar() {
    content.selectionStart --;
    content.selectionEnd --;
}

function moveRightOneChar() {
    content.selectionEnd ++;
    content.selectionStart ++;
}

// move cursor back to right before last occurence of char
function moveCursorToPrevious(char) {
    let i = getPreviousOccurence(content.selectionStart, char);
    content.selectionStart = i;
    content.selectionEnd = i;
}

function moveCursorToNext(char) {
    let i = getNextOccurence(content.selectionStart, char);
    content.selectionEnd = i;
    content.selectionStart = i;
}


// return index of next occurence of char
// (including current index)
function getNextOccurence(startingIndex, char) {
    let text = content.value;
    let i = startingIndex;
    while (text[i] != char && i < text.length) {
        i ++;
    }
    return i;
}

// returns index of previous occurence of char
// (including current index)
function getPreviousOccurence(startingIndex, char) {
    let text = content.value;
    let i = startingIndex;

    while (text[i] != char && i >= 0) {
        i --;
    }
    return i;
}


function moveBackToSpace() {
    return moveCursorToPrevious(" ");
}

function moveToNextSpace() {
    return moveCursorToNext(" ");
}

function selectParentExpr() {
    
}

function deleteSelection() {
    let text = content.value;

    let start = content.selectionStart;
    let end = content.selectionEnd;

    let before = text.substring(0, start);
    let after = text.substring(end);

    content.value = before + after;
}

// in command mode
// want to be able to type a character to invoke a function
// and then type characters to supply arguments

// 