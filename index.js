let content = document.getElementById("content");

let mode = "insert";

content.addEventListener("keydown", handleKey);
content.addEventListener("keyup", save);
window.addEventListener("load", onLoad);


function save(event) {
    localStorage.setItem("text", content.value);
    localStorage.setItem("mode", mode);

    localStorage.setItem("start", content.selectionStart);
    localStorage.setItem("end", content.selectionEnd);

}

function onLoad(event) {
    content.focus();
    content.value = localStorage.getItem("text");
    mode = localStorage.getItem("mode");

    console.log(mode);

    let start = localStorage.getItem("start");
    let end = localStorage.getItem("end");

    content.selectionStart = start;
    content.selectionEnd = end;

}



let commands = new Map();

commands.set("i", enterInsertMode);
commands.set("j", moveLeftOneChar);
commands.set("k", moveRightOneChar);
commands.set("e", moveBackToSpace);
commands.set("r", moveToNextSpace);
commands.set("`", null);



let enterNavModeKey = "`";


content.addEventListener("keydown", handleKey);

function handleKey(event) {
    let key = event.key;
    if (mode == "insert") {
        if (key == enterNavModeKey) {
            event.preventDefault();
            mode = "navigate";
        }
    }
    else if (mode == "navigate") {
        event.preventDefault();
        navModeHandle(key);
    }
}

function navModeHandle(key) {
    commands.get(key)();
    
}

function enterInsertMode() {
    mode = "insert";
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
function moveCursorToRecent(char) {
    let i = getRecentOccurence(content.selectionStart, char, content.value);
    content.selectionStart = i;
    content.selectionEnd = i;
}

function moveCursorToNext(char) {
    let i = getNextOccurence(content.selectionStart, char, content.value);
    content.selectionEnd = i;
    content.selectionStart = i;
}


// returns (k + 1), where text[k] is next occurence of char,
// including character at current index
function getNextOccurence(current, char, text) {
    let i = current;
    while (text[i] != char && i < text.length) {
        i ++;
    }
    return i+1;
}

// returns k, where text[k] is most recent occurence of char,
// not including character at current index,
function getRecentOccurence(current, char, text) {
    let i = current - 1;
    while (text[i] != char && i > 0) {
        i --;
    }
    return i;
}


function moveBackToSpace() {
    return moveCursorToRecent(" ");
}

function moveToNextSpace() {
    return moveCursorToNext(" ");
}