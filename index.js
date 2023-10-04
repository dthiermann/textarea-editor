let content = document.getElementById("content");

content.focus();

let mode = "insert";

let enterNavModeKey = "`";
let enterInsertModeKey = "i";

console.log(mode);

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
    console.log(mode);
    console.log(key);

}

function handleNav(event) {
    event.preventDefault();
    let key = event.key;
    if (key == enterInsertModeKey) {
        mode = "insert";
        
    }
    console.log(mode);
    console.log(key);

}