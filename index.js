let content = document.getElementById("content");

content.value = localStorage.getItem("text");

// want textarea content to persist after refresh
// we want to store textarea content in some data structure
// window onload, refill textarea with content

content.focus();

let mode = "insert";

let enterNavModeKey = "`";
let enterInsertModeKey = "i";


content.addEventListener("keydown", handleKey);

function handleKey(event) {
    
    if (mode == "insert") {
        handleInsert(event);
    }
    else if (mode == "navigate") {
        handleNav(event);
    }
}

function handleInsert(event) {
    let key = event.key;
    if (key == enterNavModeKey) {
        event.preventDefault();
        mode = "navigate";
    }
    else {
    }
}

function handleNav(event) {
    event.preventDefault();
    let key = event.key;
    if (key == enterInsertModeKey) {
        mode = "insert";
        
    }
}