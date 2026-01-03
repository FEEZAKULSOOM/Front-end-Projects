const checkBtn = document.querySelector("#check-btn");
const textInput = document.querySelector("#text-input");
const result = document.querySelector("#result");

checkBtn.addEventListener("click", () => {
  const inputValue = textInput.value;

  if (inputValue === "") {
    alert("Please input a value");
    return;
  }

  // Remove non-alphanumeric characters and convert to lowercase
  const cleanedText = inputValue
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  // Reverse the cleaned string
  const reversedText = cleanedText.split("").reverse().join("");

  // Check palindrome
  if (cleanedText === reversedText) {
    result.textContent = `${inputValue} is a palindrome`;
  } else {
    result.textContent = `${inputValue} is not a palindrome`;
  }
});
