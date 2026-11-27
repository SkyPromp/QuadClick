# QuadClick
A new way of mouseless navigation on websites using quadtrees!

Available on the Chrome Web Store [here](https://chromewebstore.google.com/detail/quadclick/mcpdbmkecgnghdcjkmieggkeponjhfpf)

<img width="1900" height="935" alt="image" src="https://github.com/user-attachments/assets/755b747a-fd58-43b7-ab83-55b84d784fef" />

This extension is meant to a be a powertool for people who want to maximize productivity and get every last percent out of their workflows. This tool is handcrafted and will be extended in the future to allow for more possibilities and customizability. For any bugs or suggestions, please contact me on my Discord: @skypromp, add a message with some context. My next goals with this project is to reduce the average/maximum number of keypresses needed to reach any pixel on the screen. Currently on 1920x1080 the maximum required motions to reach any pixel is 11, although the average is closer to 9. Luckily most buttons on the internet are bigger than 1 pixel and thus will the average number of motions be significantly reduced. Realistically the average number of motions should be between 3.5-5 for most users on 1920x1080 monitors. For bigger resolutions this isn't much different luckily. I will provide better numbers in the future. My goal is to have a reproduceable set of motions so users can have them in their muscle memory and do not rely on visual queues as in other solutions. I want to provide a wide set of tools so users can go as far as they want with these motions. Currently I only support vertical scrolling, jumping and the quadtree navigation and undo/cancel actions.

## Demo
[![Watch the demo](https://img.youtube.com/vi/zjbKXGUif_o/0.jpg)](https://www.youtube.com/watch?v=zjbKXGUif_o)

**▶ Click above to watch the demo on YouTube**

## How to use
All keybindings are configurable, but the default keybindings are:
- start by pressing Ctrl-M

Once started:

Navigate with quadtrees using
- H -> top left
- L -> top right
- J -> bottom left
- K -> bottom right

- U -> undo last navigation
- C -> click on the element the latest crosshair is placed on

- Ctrl-J -> page down
- Ctrl-K -> page up
- Alt-J -> scroll down
- Alt-K -> scroll up

- Ctrl-C -> cancel

Click on the icon to change the keybindings, line width and line colour

## How to install
Either via the Chrome Web Store [here](https://chromewebstore.google.com/detail/quadclick/mcpdbmkecgnghdcjkmieggkeponjhfpf). 

Or install it manually:
1) git clone git@github.com:SkyPromp/QuadClick.git
2) cd QuadClick
3) zip -r QuadClick.zip popup.* icons content.js manifest.json
4) Go to chrome:extensions in the browser
5) Enable developer settings
6) Click Load unpacked and select the zip file

## Future plans
- Improve css for the popup
- Different split types than only 2x2?
- Reset keybindings
- Settings for scroll speed
- Smooth scrolling?
- Prevent duplicate keybindings
