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
    localStorage.getItem("mode");

    let start = localStorage.getItem("start");
    let end = localStorage.getItem("end");

    content.selectionStart = start;
    content.selectionEnd = end;

}



let commands = new Map();

commands.set("i", enterInsertMode);
commands.set("j", moveLeftOneChar);
commands.set("k", moveRightOneChar);



let enterNavModeKey = "`";


content.addEventListener("keydown", handleKey);

function handleKey(event) {
    let key = event.key;
    if (mode == "insert") {
        if (key == enterNavModeKey) {
            event.preventDefault();
            mode = "navigate";
        }
        insertLetterInNode(key, textTree);
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

function moveToLineStart() {
    // move selectionstart back to the most recent newline
    
}

// try displaying each letter in a div to see if it looks good
// let newdiv = document.createElement("div");
let newContent = document.createTextNode("H");

let newDiv = document.createElement("div");
let nextDiv = document.createElement("div");
document.body.appendChild(newDiv);
document.body.appendChild(nextDiv);

nextDiv.textContent = "b";
newDiv.textContent = "a";

// command mode and insert mode

// select parent node
// select first child
// move selection to adjacent sibling (up/down)
// insert to right/left of current node
// DELETE: delete selection
// i: insert, replacing current selection

class Node {
    constructor(children, parent, text) {
        this.children = children;
        this.parent = parent;
        this.text = text;
    }
}

// make a node with entered text
let textTree = new Node([], null, "");

function insertLetterInNode(letter, node) {
    node.text += letter;
    console.log(node.text);
}



function insertChar(letter, word, index) {
    let newWord = word.slice(0, index) + letter + word.slice(index);
    index++;
    return newWord;
}





let separator = " ";
let leftGroup = "(";
let rightGroup = ")";

