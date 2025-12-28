let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

// Winning patterns
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Box click logic
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "chocolate";
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "#6B6054";
      turnO = true;
    }

    box.disabled = true;
    count++;

    checkWinner();
  });
});

// Disable all boxes
const disableBtns = () => {
  boxes.forEach((box) => (box.disabled = true));
};

// Enable & clear all boxes
const enableBtns = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

// Reset game
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBtns();
  msgContainer.classList.add("hide");
  msgContainer.classList.remove("draw-anim");
};

// Show winner + balloons
const showWinner = (winner) => {
  msg.innerText = `🎉 Congratulations! Winner is ${winner} 🎉`;
  msgContainer.classList.remove("hide");
  disableBtns();
  showBalloons();
};

// Check winner / draw
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1);
      return;
    }
  }

  // Draw condition
  if (count === 9) {
    msg.innerText = "🤝 It's a Draw!";
    msgContainer.classList.remove("hide");
    msgContainer.classList.add("draw-anim");
    disableBtns();
  }
};

// Balloon animation
const showBalloons = () => {
  for (let i = 0; i < 20; i++) {
    let balloon = document.createElement("div");
    balloon.classList.add("balloon");

    balloon.style.left = Math.random() * 100 + "vw";
    balloon.style.backgroundColor =
      ["red", "blue", "green", "orange", "purple", "pink"][
        Math.floor(Math.random() * 6)
      ];

    document.body.appendChild(balloon);

    setTimeout(() => {
      balloon.remove();
    }, 4000);
  }
};

// Buttons
newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
