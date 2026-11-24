const directions = {
    l: [-1, 1], arrowright: [-1, 1],
    k: [1, 1], arrowup: [1, 1],
    h: [-1, -1], arrowleft: [-1, -1],
    j: [1, -1], arrowdown: [1, -1]
};

function addCross(size, x_offset, y_offset){
    const offset = Math.pow(1/2, size - 1) * 100;

    let ver = document.createElement(`div`); // |
    ver.className = "quadclickline";
    ver.style.width = "1px";
    ver.style.height = `${offset}%`;
    ver.style.top = `${x_offset - offset / 2}%`;
    ver.style.left = `${y_offset}%`;

    let hor = document.createElement(`div`); // -
    hor.className = "quadclickline"
    hor.style.width = `${offset}%`;
    hor.style.height = "1px";
    hor.style.top = `${x_offset}%`;
    hor.style.left = `${y_offset - offset / 2}%`;

    document.documentElement.appendChild(ver);
    document.documentElement.appendChild(hor);

    return [hor, ver];
}

function drawDebugDot(x, y){
    let dot = document.createElement(`div`);
    dot.className = "quadclickline"
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
    let size;
    let x_offset, y_offset;
    let actions_stack = [];
    let elements_stack = [];

    function reset(){
        size = 1;
        x_offset = 50;
        y_offset = 50;
        actions_stack = [];

        elements_stack.forEach(els => els.forEach(el => el.remove()));

        elements_stack = [];
    }

    reset();

    const style = document.createElement('style');

    style.textContent = `.quadclickline {
      position: fixed;
      background-color: #ff0000;
      z-index: 2147483647;
      pointer-events: none;
    }`;

    document.documentElement.appendChild(style);

    document.addEventListener('keydown', (event) => {
        const delta = Math.pow(1/2, size + 1) * 100;
        const is_enabled = elements_stack.length > 0;
        const direction_scalars = directions[event.key.toLowerCase()];

        if (event.ctrlKey && event.key.toLowerCase() === 'm' && !is_enabled) { // Start
            elements_stack.push(addCross(size, x_offset, y_offset));
        } else if (is_enabled && direction_scalars) {
            const [dx, dy] = direction_scalars.map(d => d * delta);
            size += 1;
            x_offset += dx;
            y_offset += dy;
            actions_stack.push([dx, dy]);
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
            reset();

        } else if (is_enabled && event.key.toLowerCase() === 'c') { // Click left mouse
            let x = y_offset * screen_width / 100;
            let y = x_offset * screen_height / 100;
            let central_element = document.elementFromPoint(x, y);

            central_element?.focus();
            central_element?.click();

            reset();
        }
    }, true);
})();
