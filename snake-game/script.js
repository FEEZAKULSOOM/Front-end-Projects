// ============================
// ENHANCED SNAKE GAME JS
// ============================

// ---------- 1. DOM ELEMENTS ----------
let board = document.querySelector(".board");  // Game board
let keys = document.querySelectorAll(".key");  // Mobile buttons

// ---------- 2. GAME VARIABLES ----------
let foodX = 11;        // Food initial X
let foodY = 3;         // Food initial Y
let snakeX = 3;        // Snake head X
let snakeY = 5;        // Snake head Y
let snakeBody = [];    // Array to store snake segments
let velocityX = 0;     // Current horizontal movement
let velocityY = 0;     // Current vertical movement

// New: Store next direction to avoid collision bug
let nextVelocityX = 0; // Next horizontal direction
let nextVelocityY = 0; // Next vertical direction

let gameOver = false;  // Game over flag
let setIntervalId;     // Interval ID for game loop

// ---------- 3. AUDIO ----------
let gameOverSound = new Audio("game-over.mp3");
let eatingSound = new Audio("eating-sound.mp3");
let turnSound = new Audio("turnround.mp3");

// ---------- 4. RANDOM FOOD POSITION ----------
function randomFoodPosition() {
    // Generate random X/Y position for food on grid (1 to 14)
    foodX = Math.floor(Math.random() * 14) + 1;
    foodY = Math.floor(Math.random() * 14) + 1;
}

// ---------- 5. SHOW GAME OVER ----------
function showGameOver() {
    clearInterval(setIntervalId);             // Stop the game loop
    gameOverSound.play();                     // Play game over sound
    document.removeEventListener("keydown", moveSnake); // Stop key input
    turnSound.pause();                        // Pause turn sound
}

// ---------- 6. MOVE SNAKE (KEY PRESS) ----------
function moveSnake(e) {
    // Set next direction based on arrow keys
    if (e.key === "ArrowUp" && velocityY !== 1) {
        nextVelocityX = 0;
        nextVelocityY = -1;
        turnSound.play();
    } else if (e.key === "ArrowDown" && velocityY !== -1) {
        nextVelocityX = 0;
        nextVelocityY = 1;
        turnSound.play();
    } else if (e.key === "ArrowLeft" && velocityX !== 1) {
        nextVelocityX = -1;
        nextVelocityY = 0;
        turnSound.play();
    } else if (e.key === "ArrowRight" && velocityX !== -1) {
        nextVelocityX = 1;
        nextVelocityY = 0;
        turnSound.play();
    }
}

// ---------- 7. MOBILE BUTTONS ----------
keys.forEach((key) => {
    key.addEventListener("click", () => {
        moveSnake({ key: key.dataset.key }); // Simulate arrow key press
    });
});

// ---------- 8. MAIN GAME LOOP ----------
function main() {
    // Step 1: If game over, stop
    if (gameOver) return showGameOver();

    // Step 2: Update snake direction before moving
    velocityX = nextVelocityX;
    velocityY = nextVelocityY;

    // Step 3: Check if snake eats food
    if (snakeX === foodX && snakeY === foodY) {
        randomFoodPosition();           // Move food
        eatingSound.play();             // Play eating sound
        snakeBody.push([snakeX, snakeY]); // Grow snake
    }

    // Step 4: Move snake body (from tail to head)
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1]; // Each segment moves to previous
    }

    // Step 5: Calculate new head position
    let nextX = snakeX + velocityX;
    let nextY = snakeY + velocityY;

    // Step 6: Check wall collision
    if (nextX <= 0 || nextX > 14 || nextY <= 0 || nextY > 14) {
        gameOver = true;
        return showGameOver();
    }

    // Step 7: Update snake head
    snakeX = nextX;
    snakeY = nextY;
    snakeBody[0] = [snakeX, snakeY]; // Head is first element

    // Step 8: Render snake and food
    let setHTML = `<div class="food" style="grid-area: ${foodY}/${foodX};"></div>`;

    for (let i = 0; i < snakeBody.length; i++) {
        setHTML += `<div class="snakeHead" id="div${i}" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`;
        // Self-collision check
        if (i != 0 && snakeBody[0][0] === snakeBody[i][0] && snakeBody[0][1] === snakeBody[i][1]) {
            gameOver = true;
        }
    }

    // Step 9: Update the board
    board.innerHTML = setHTML;
}

// ---------- 9. RESET FUNCTION ----------
function reset() {
    location.reload(); // Reload page → restart game
}

// ---------- 10. START GAME ----------
randomFoodPosition();                 // Place initial food
snakeBody.push([snakeX, snakeY]);    // Add initial snake head to array
main();                               // Draw initial snake and food
setIntervalId = setInterval(main, 160); // Start game loop
document.addEventListener("keydown", moveSnake); // Listen for arrow keys
