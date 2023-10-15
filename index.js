let content = document.getElementById("content");

content.addEventListener("keydown", handleKey);
content.addEventListener("keyup", updateStorage);
window.addEventListener("load", updateContent);

function updateStorage(event) {
    localStorage.setItem("text", content.value);
}

function updateContent(event) {
    if (localStorage.getItem("text")) {
        content.value = localStorage.getItem("text");
    }
    else {
        content.value = "";
    }
}

content.focus();

let mode = "insert";

let enterNavModeKey = "`";
let enterInsertModeKey = "i";

let moveLeftOneChar = "j";
let moveRightOneChar = "k";
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
    switch (key) {
        case enterInsertModeKey:
            mode = "insert";
        case moveLeftOneChar:
            content.selectionStart --;
            content.selectionEnd --;
            break;
        case moveRightOneChar:
            content.selectionStart ++;
            content.SelectionEnd ++;
            break;
    }
}

