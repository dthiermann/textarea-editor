let content = document.getElementById("content");
let displayedCommands = document.getElementById("commands");
let displayedMode = document.getElementById("mode");

window.addEventListener("keydown", handleKey);
window.addEventListener("keyup", save);
window.addEventListener("load", onLoad);

let leftGroupKey = "(";
let rightGroupKey = ")";
let separatorKey = " ";

let mode = "command";

function save(event) {
    localStorage.setItem("text", content.value);
    localStorage.setItem("start", content.selectionStart);
    localStorage.setItem("end", content.selectionEnd);

    displayedMode.textContent = "mode: " + mode;

}

function onLoad(event) {
    content.focus();
    content.value = localStorage.getItem("text");

    let start = localStorage.getItem("start");
    let end = localStorage.getItem("end");

    mode = "command";

    displayedMode.textContent = "mode: " + mode;

    content.selectionStart = start;
    content.selectionEnd = end;

}

let commands = new Map();

let enterCommandModeKey = "`";
let enterInsertModeKey = "i";

commands.set("`", doNothing);
commands.set("j", moveLeftOneChar);
commands.set("k", moveRightOneChar);
commands.set("e", moveBackToSpace);
commands.set("r", moveToNextSpace);
commands.set("s", selectParentExpr);
commands.set("w", selectWord)
commands.set("x", deleteSelection);
commands.set("l", collapseLeft);
commands.set("h", collapseRight)

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
// if no later occurence, should return total length of text
function getNextOccurence(startingIndex, char) {
    let i = startingIndex;
    let text = content.value;

    while (text[i] != char && i < text.length) {
        i ++;
    }
    return i;
}

// returns index of previous occurence of char
// (including current index)
// if no previous occurrence, should return 0
function getPreviousOccurence(startingIndex, char) {
    let i = startingIndex;
    let text = content.value;

    while (text[i] != char && i > 0) {
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

    content.selectionStart = 0;
    content.selectionEnd = content.value.length;
}

function deleteSelection() {
    let leftCut = Math.min(content.selectionStart, content.selectionEnd);
    let rightCut = Math.max(content.selectionStart, content.selectionEnd);

    let before = content.value.substring(0, leftCut);
    let after = content.value.substring(rightCut);

    content.value = before + after;

    content.selectionStart = leftCut;
    content.selectionEnd = leftCut;
}

function collapseRight() {
    content.selectionStart = content.selectionEnd;
}

function collapseLeft() {
    content.selectionEnd = content.selectionStart;
}

// if the textarea becomes unfocused, the selection goes away
// want to be able to focus the textarea and get a cursor anywhere
// want mode switching to work even when the text box is not selected

// when the textarea is not selected, selectionStart and selectionEnd
// are null (I think)
// need to examine how command functions behave with null arguments

