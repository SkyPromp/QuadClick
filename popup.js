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

