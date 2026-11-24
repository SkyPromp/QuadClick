// ==UserScript==
// @name         QuadClick
// @version      2026-11-23
// @description  Use quad trees to click on elements
// @author       SkyPromp
// @match        *://*/*
// @run-at       document-idle
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`
.line {
  position: absolute;
  background-color: #ff0000;
  z-index: 2147483647;
  pointer-events: none;
}
`);


function addCross(size, x_offset, y_offset){
    let ver = document.createElement(`div`); // |
    ver.className = "line";
    ver.style.width = "1px";
    ver.style.height = `${Math.pow(1/2, size - 1) * 100}%`;
    ver.style.top = `${x_offset - Math.pow(1/2, size - 1) * 100 / 2}%`;
    ver.style.left = `${y_offset}%`;

    let hor = document.createElement(`div`); // -
    hor.className = "line"
    hor.style.width = `${Math.pow(1/2, size - 1) * 100}%`;
    hor.style.height = "1px";
    hor.style.left = `${y_offset - Math.pow(1/2, size - 1) * 100 / 2}%`;
    hor.style.top = `${x_offset}%`;

    document.documentElement.appendChild(hor);
    document.documentElement.appendChild(ver);

    return [hor, ver];
}

function drawDebugDot(x, y){
    let dot = document.createElement(`div`);
    dot.className = "line"
    dot.style.width = `5px`;
    dot.style.height = "5px";
    dot.style.left = `${(x - 2)}px`;
    dot.style.top = `${(y - 2)}px`;
    dot.style.backgroundColor = "green";

    document.documentElement.appendChild(dot);
}

(function() {
    'use strict';
    const screen_width = window.innerWidth;
    const screen_height = window.innerHeight;
    let size = 1;
    let x_offset = 50;
    let y_offset = 50;
    let actions_stack = [];
    let elements_stack = [];

    document.addEventListener('keydown', (event) => {
        let delta = Math.pow(1/2, size + 1) * 100;
        let is_enabled = elements_stack.length > 0;

        if (event.ctrlKey && event.key.toLowerCase() === 'm' && !is_enabled) { // Start
            elements_stack.push(addCross(size, x_offset, y_offset));
        } else if (is_enabled && (event.key.toLowerCase() === 'l' || event.key === 'ArrowRight')) { // Top right
            size += 1;
            x_offset -= delta;
            y_offset += delta;
            actions_stack.push([-delta, delta]);
            elements_stack.push(addCross(size, x_offset, y_offset));
        } else if (is_enabled && (event.key.toLowerCase() === 'k' || event.key === 'ArrowUp')) { // Bottom right
            size += 1;
            x_offset += delta;
            y_offset += delta;
            actions_stack.push([delta, delta]);
            elements_stack.push(addCross(size, x_offset, y_offset));
        } else if (is_enabled && (event.key.toLowerCase() === 'h' || event.key === 'ArrowLeft')) { // Top left
            size += 1;
            x_offset -= delta;
            y_offset -= delta;
            actions_stack.push([-delta, -delta]);
            elements_stack.push(addCross(size, x_offset, y_offset));
        } else if (is_enabled && (event.key.toLowerCase() === 'j' || event.key === 'ArrowDown')) { // Bottom left
            size += 1;
            x_offset += delta;
            y_offset -= delta;
            actions_stack.push([delta, -delta]);
            elements_stack.push(addCross(size, x_offset, y_offset));
        } else if (is_enabled && event.key.toLowerCase() === 'u') { // Go 1 layer back
            let dx, dy, lx, ly;

            [dx, dy] = actions_stack.pop();
            [lx, ly] = elements_stack.pop();

            x_offset -= dx;
            y_offset -= dy;
            size -= 1;
            lx.remove();
            ly.remove();
        } else if (is_enabled && event.ctrlKey && event.key.toLowerCase() === 'c') {
            size = 1;
            x_offset = 50;
            y_offset = 50;
            actions_stack = [];

            elements_stack.forEach(el => {
                el[0].remove();
                el[1].remove();
            });

            elements_stack = [];
        } else if (is_enabled && event.key.toLowerCase() === 'c') { // Click left mouse
            let x = y_offset * screen_width / 100;
            let y = x_offset * screen_height / 100;
            let central_element = document.elementFromPoint(x, y);

            central_element.focus();
            central_element.click();

            size = 1;
            x_offset = 50;
            y_offset = 50;
            actions_stack = [];

            elements_stack.forEach(el => {
                el[0].remove();
                el[1].remove();
            });

            elements_stack = [];
        }
    }, true);
})();
