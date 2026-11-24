const line_thickness = document.getElementById("line_thickness");
chrome.storage.sync.get(["line_thickness"], (v => line_thickness.value = v.line_thickness ?? "1"));

line_thickness.addEventListener('change', (event) => {
    chrome.storage.sync.set({line_thickness: event.target.value});
    document.getElementById("label_line_thickness").innerText = `Thickness (${event.target.value})`;
});

const line_colour_picker = document.getElementById("line_colour_picker");
chrome.storage.sync.get(["line_colour"], (v => line_colour_picker.value = v.line_colour ?? "#ff0000"));

line_colour_picker.addEventListener('change', (event) => {
    chrome.storage.sync.set({line_colour: event.target.value});
});

const char_settings = {
    top_left: ["Top left", "h"],
    top_right: ["Top right", "l"],
    bottom_left: ["Bottom left", "j"],
    bottom_right: ["Bottom right", "k"],
    undo: ["Undo", "u"],
    left_click: ["Left click", "c"]
};

for (const [name, [title, char]] of Object.entries(char_settings)) {
    let el = document.createElement("div");

    el.innerHTML = `
        <label for="${name}">${title}: </label>
        <input type="text" id="${name}" maxlength="1" value="${char}">
    `;
    el.className = "aligned_input";

    chrome.storage.sync.get([name], (v => el.value = v[name] ?? char));

    el.addEventListener('change', (event) => {
        chrome.storage.sync.set({[name]: event.target.value});
    });

    document.body.appendChild(el);
}

