let content = document.getElementById("content");

let mode = "insert";

content.addEventListener("keydown", handleKey);
content.addEventListener("keyup", updateStorage);
window.addEventListener("load", updateContent);



function updateStorage(event) {
    localStorage.setItem("text", content.value);
    localStorage.setItem("mode", mode);
}

function updateContent(event) {
    if (localStorage.getItem("text")) {
        content.value = localStorage.getItem("text");
    }
    else {
        content.value = "";
    }
    localStorage.getItem("mode");
}



let commands = new Map();

commands.set("i", enterInsertMode);
commands.set("j", moveLeftOneChar);
commands.set("k", moveRightOneChar);



let enterNavModeKey = "`";

// insert mode: can enter nav mode, or do default insert action
// nav mode: can enter insert mode, or do nav action

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




// command mode and insert mode

// select parent node
// select first child
// move selection to adjacent sibling (up/down)
// insert to right/left of current node
// DELETE: delete selection
// i: insert, replacing current selection

// tree: list of children
// leaf: string
// at the beginning, an empty tree


