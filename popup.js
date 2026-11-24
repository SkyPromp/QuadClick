const line_thickness = document.getElementById("line_thickness");
chrome.storage.sync.get(["line_thickness"], (v => line_thickness.value = v.line_thickness ?? "1"));

line_thickness.addEventListener('change', (event) => {
    console.log("QUAD", event);
    chrome.storage.sync.set({line_thickness: event.target.value});
});

const line_colour_picker = document.getElementById("line_colour_picker");
chrome.storage.sync.get(["line_colour"], (v => line_colour_picker.value = v.line_colour ?? "#ff0000"));

line_colour_picker.addEventListener('change', (event) => {
    console.log("QUAD", event);
    chrome.storage.sync.set({line_colour: event.target.value});
});

const top_left = document.getElementById("top_left");
chrome.storage.sync.get(["top_left"], (v => top_left.value = v.top_left ?? "h"));

top_left.addEventListener('change', (event) => {
    console.log("QUAD", event);
    chrome.storage.sync.set({top_left: event.target.value});
});

const top_right = document.getElementById("top_right");
chrome.storage.sync.get(["top_right"], (v => top_right.value = v.top_right ?? "l"));

top_right.addEventListener('change', (event) => {
    console.log("QUAD", event);
    chrome.storage.sync.set({top_right: event.target.value});
});

const bottom_left = document.getElementById("bottom_left");
chrome.storage.sync.get(["bottom_left"], (v => bottom_left.value = v.bottom_left ?? "j"));

bottom_left.addEventListener('change', (event) => {
    console.log("QUAD", event);
    chrome.storage.sync.set({bottom_left: event.target.value});
});

const bottom_right = document.getElementById("bottom_right");
chrome.storage.sync.get(["bottom_right"], (v => bottom_right.value = v.bottom_right ?? "k"));

bottom_right.addEventListener('change', (event) => {
    console.log("QUAD", event);
    chrome.storage.sync.set({bottom_right: event.target.value});
});

const undo = document.getElementById("undo");
chrome.storage.sync.get(["undo"], (v => undo.value = v.undo ?? "u"));

undo.addEventListener('change', (event) => {
    console.log("QUAD", event);
    chrome.storage.sync.set({undo: event.target.value});
});

const left_click = document.getElementById("left_click");
chrome.storage.sync.get(["left_click"], (v => left_click.value = v.left_click ?? "c"));

left_click.addEventListener('change', (event) => {
    console.log("QUAD", event);
    chrome.storage.sync.set({left_click: event.target.value});
});

