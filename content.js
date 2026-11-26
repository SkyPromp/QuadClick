function addCross(size, x_offset, y_offset){
    const offset = Math.pow(1/2, size - 1) * 100;

    let ver = document.createElement(`div`); // |
    ver.className = 'quadclickline';
    ver.style.height = `${offset}%`;
    ver.style.top = `${x_offset - offset / 2}%`;
    ver.style.left = `${y_offset}%`;

    let hor = document.createElement(`div`); // -
    hor.className = 'quadclickline'
    hor.style.width = `${offset}%`;
    hor.style.top = `${x_offset}%`;
    hor.style.left = `${y_offset - offset / 2}%`;

    document.documentElement.appendChild(ver);
    document.documentElement.appendChild(hor);

    return [hor, ver];
}

function drawDebugDot(x, y){
    let dot = document.createElement(`div`);
    dot.className = 'quadclickline'
    dot.style.width = `5px`;
    dot.style.height = '5px';
    dot.style.left = `${(x - 2)}px`;
    dot.style.top = `${(y - 2)}px`;
    dot.style.backgroundColor = 'green';

    document.documentElement.appendChild(dot);
}

(function() {
    'use strict';
    const screen_width = window.innerWidth;
    const screen_height = window.innerHeight;
    let size;
    let x_offset, y_offset;
    let actions_stack = [];
    let elements_stack = [];
    const default_settings = { // ! = ctrl, + = alt, !+ ctrl+alt, always ctrl+alt, never alt+ctrl
        line_thickness: 1,
        line_colour: '#ff0000',
        top_left: 'h',
        top_right: 'l',
        bottom_left: 'j',
        bottom_right: 'k',
        undo: 'u',
        left_click: 'c',
        page_down: '!j',
        page_up: '!k',
        scroll_down: '+j',
        scroll_up: '+k',
        activate_mode: '!m',
        deactivate_mode: '!c'
    };

    let settings = {...default_settings};

    let directions = {
        [settings.top_right]: [-1, 1],
        [settings.bottom_right]: [1, 1],
        [settings.top_left]: [-1, -1],
        [settings.bottom_left]: [1, -1],
    }

    const style = document.createElement('style');

    function updateSettings(){
        style.textContent = `.quadclickline {
            position: fixed;
            background-color: ${settings.line_colour ?? default_settings.line_colour};
            z-index: 2147483647;
            pointer-events: none;
            width: ${settings.line_thickness ?? default_settings.line_thickness}px;
            height: ${settings.line_thickness ?? default_settings.line_thickness}px;
        }`;

        directions = {
            [settings.top_right]: [-1, 1],
            [settings.bottom_right]: [1, 1],
            [settings.top_left]: [-1, -1],
            [settings.bottom_left]: [1, -1],
        };
    }

    updateSettings();

    chrome.storage.sync.get(default_settings, v => {
        Object.assign(settings, v);
        updateSettings();
    });

    chrome.storage.onChanged.addListener((changes, area) => {
        if (area !== 'sync') return;
        let has_changed = false;

        for (const [key, change] of Object.entries(changes)){
            if (key in settings) {
                settings[key] = change.newValue;
                has_changed = true;
            }
        }

        if (has_changed) updateSettings();
    });

    function reset(){
        size = 1;
        x_offset = 50;
        y_offset = 50;
        actions_stack = [];

        elements_stack.forEach(els => els.forEach(el => el.remove()));

        elements_stack = [];
    }

    reset();

    document.documentElement.appendChild(style);

    document.addEventListener('keydown', (event) => {
        if (!event.key || /^F\d+$/.test(event.key)) return;

        const input = `${event.ctrlKey ? '!': ''}${event.altKey ? '+' : ''}${event.key.toLowerCase()}`

        const delta = Math.pow(1/2, size + 1) * 100;
        const is_enabled = elements_stack.length > 0;
        const direction_scalars = directions[input];

        if (!is_enabled) {
            if (input === settings.activate_mode) elements_stack.push(addCross(size, x_offset, y_offset)); // Start
            else return; // So the prevent default doesn't get triggered if nothing hits

            event.preventDefault(); // Only if enabled and something gets triggered

            return;  // Stop function if not enabled
        }

        // Everything from here happens only if it's enabled

        if (direction_scalars) {
            const [dx, dy] = direction_scalars.map(d => d * delta);
            size += 1;
            x_offset += dx;
            y_offset += dy;
            actions_stack.push([dx, dy]);
            elements_stack.push(addCross(size, x_offset, y_offset));
        } else if (input === settings.undo && actions_stack.length > 0) {
            let dx, dy, lx, ly;

            [dx, dy] = actions_stack.pop();
            [lx, ly] = elements_stack.pop();

            x_offset -= dx;
            y_offset -= dy;
            size -= 1;
            lx.remove();
            ly.remove();
        } else if (input === settings.deactivate_mode) {
            reset();
        } else if (input === settings.left_click) {
            let x = y_offset * screen_width / 100;
            let y = x_offset * screen_height / 100;
            let central_element = document.elementFromPoint(x, y);

            central_element?.focus();
            central_element?.click();

            reset();
        } else if (input === settings.page_down) {
            window.scrollBy({
                top: screen_height,
                behavior: 'instant'
            });
        } else if (input === settings.page_up) {
            window.scrollBy({
                top: -screen_height,
                behavior: 'instant'
            });
        } else if (input === settings.scroll_down) {
            window.scrollBy({
                top: 20,
                behavior: 'instant'
            });
        } else if (input === settings.scroll_up) {
            window.scrollBy({
                top: -20,
                behavior: 'instant'
            });
        } else return; // So the prevent default doesn't get triggered if nothing hits

        event.preventDefault(); // Only if enabled and something gets triggered

    }, true);
})();
