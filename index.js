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

function handleKey(event) {
    let key = event.key;
    if (mode == "insert") {

    }
    else if (mode == "navigate") {
        navModeHandle(key);
    }
}


function navModeHandle(key) {
    if (key == enterInsertModeKey) {
        mode = "insert";
        
    }
}

