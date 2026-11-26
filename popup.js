const line_thickness = document.getElementById('line_thickness');
chrome.storage.sync.get(['line_thickness'], (v => {
    line_thickness.value = v.line_thickness ?? '1';
    document.getElementById('label_line_thickness').innerText = `Thickness (${v.line_thickness ?? '1'})`;
}));

line_thickness.addEventListener('change', (event) => {
    chrome.storage.sync.set({line_thickness: event.target.value});
    document.getElementById('label_line_thickness').innerText = `Thickness (${event.target.value})`;
});

const line_colour_picker = document.getElementById('line_colour_picker');
chrome.storage.sync.get(['line_colour'], (v => line_colour_picker.value = v.line_colour ?? '#ff0000'));

line_colour_picker.addEventListener('change', (event) => {
    chrome.storage.sync.set({line_colour: event.target.value});
});

const char_settings = {
    top_left: ['Top left', 'h'],
    top_right: ['Top right', 'l'],
    bottom_left: ['Bottom left', 'j'],
    bottom_right: ['Bottom right', 'k'],
    undo: ['Undo', 'u'],
    left_click: ['Left click', 'c'],
    page_down: ['Page down', '!j'],
    page_up: ['Page up', '!k'],
    scroll_down: ['Scroll down', '+j'],
    scroll_up: ['Scroll up', '+k'],
    activate_mode: ['Activate mode', '!m'],
    deactivate_mode: ['Deactivate mode', '!c'],
};

const toast = document.getElementById("toast");

for (const [name, [title, char]] of Object.entries(char_settings)) {
    let el = document.createElement('div');

    el.innerHTML = `
        <label for='${name}'>${title}: </label>
        <input type='text' id='${name}' maxlength='3' value='${char}'>
    `;
    el.className = 'aligned_input';

    const input = el.querySelector(`#${name}`);

    chrome.storage.sync.get([name], (v => input.value = v[name] ?? char));

    el.addEventListener('change', (event) => {
        if (!/^[!]?[+]?[a-zA-Z1-0.^@#$%&(){}[]-_=\/\ <>,;:]$/.test(event.target.value)) {
            toast.textContent = `Invalid key (${event.target.value})`
            toast.classList.remove("toast");
            void toast.offsetWidth;
            toast.classList.add("toast");

            chrome.storage.sync.get([name], (v => event.target.value = v[name] ?? char));

            return;
        }

        chrome.storage.sync.set({[name]: event.target.value});
    });

    document.getElementById('keybindings').appendChild(el);
}

