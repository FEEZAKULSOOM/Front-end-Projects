# Snake Game 🐍

A modern, interactive **Snake Game** built with **HTML, CSS, and JavaScript**. This version includes a **professional gaming style** with smooth animations, glowing effects, sound effects, and responsive controls for both desktop and mobile devices.

---

## 🎮 Features

- **Classic Snake Gameplay**: Move the snake to eat food and grow longer. Avoid walls and self-collision.
- **Professional Gaming Style**:
  - Animated neon-like background
  - Smooth 3D-like effects
  - Glowing snake and food
- **Sound Effects**:
  - Eating sound when the snake eats food
  - Turn sound when changing direction
  - Game over sound on collision
- **Responsive Controls**:
  - Keyboard arrow keys for desktop
  - On-screen mobile buttons for small screens
- **Easy Reset**: Restart the game using a reset button.

---

## 🛠 Technologies Used

- **HTML5** for structure
- **CSS3** for styling and animations
- **JavaScript (ES6)** for game logic and interactivity
- **Audio** for sound effects

---

## 🚀 How to Run

1. **Clone the repository** or download the files.
2. Make sure the folder contains:
   - `index.html`
   - `style.css`
   - `script.js`
   - Audio files: `game-over.mp3`, `eating-sound.mp3`, `turnround.mp3`
3. Open `index.html` in any modern browser.
4. Use **arrow keys** (desktop) or on-screen buttons (mobile) to control the snake.

---

## 📝 Game Logic Overview

1. The snake moves automatically at a fixed interval.
2. Arrow key presses (or mobile buttons) change the snake’s direction.
3. Eating the food:
   - Generates new food at a random location
   - Grows the snake
   - Plays eating sound
4. Collisions:
   - Hitting the wall or the snake’s own body ends the game
   - Plays game over sound
5. Reset button reloads the page to start a new game.

---

## 🎨 Styling

- Animated neon background for a gaming feel
- Glowing snake head and body
- Glowing food with small animation
- Mobile responsive design

---

## 🔧 How to Customize

- **Change snake or food colors**: Modify the CSS classes `.snakeHead`, `#div0`, `.food`.
- **Change speed**: Modify the interval in `setInterval(main, 160)` in `script.js`.
- **Add new sound effects**: Replace the audio files and update their paths in JS.

---

## 📂 File Structure

/snake-game
├─ index.html
├─ style.css
├─ script.js
├─ game-over.mp3
├─ eating-sound.mp3
└─ turnround.mp3
