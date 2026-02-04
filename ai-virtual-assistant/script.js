let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Speak function with girl voice
function speak(text) {
  let utter = new SpeechSynthesisUtterance(text);
  utter.rate = 1;
  utter.pitch = 1; // slightly higher for girl voice
  utter.volume = 1;
  utter.lang = "hi-GB";
  window.speechSynthesis.speak(utter);
}

// Greeting function
function wishMe() {
  let hours = new Date().getHours();
  let greeting = "";

  if (hours >= 0 && hours < 12) {
    greeting = "Good Morning, Master!";
  } else if (hours >= 12 && hours < 16) {
    greeting = "Good Afternoon, Master!";
  } else {
    greeting = "Good Evening, Master!";
  }

  speak(greeting);
}

let greeted = false;

// Button click: greet first, then start recognition
btn.addEventListener("click", () => {
  if (!greeted) {
    wishMe(); // Speak greeting
    greeted = true;
    return;   // stop here to prevent immediate command execution
  }

  recognition.start();
  btn.style.display = "none";
  voice.style.display = "block";
});

// Speech recognition setup
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

// Main command function
function takeCommand(message) {
  btn.style.display = "flex";
  voice.style.display = "none";

  // Ignore greeting messages so they don't trigger search
  const greetings = ["good morning", "good afternoon", "good evening"];
  if (greetings.some(g => message.includes(g))) {
    return;
  }

  // Responses
  if (message.includes("hello")) {
    speak("Hello, Master!How can i help you today!");
  }
  else if (message.includes("who are you")) {
    speak("I am a virtual assistant created by Fiza Fareed!");
  }
  else if (message.includes("open youtube")) {
    speak("Opening YouTube..");
    window.open("https://www.youtube.com/");
  }
  else if (message.includes("open google")) {
    speak("Opening Google..");
    window.open("https://www.google.com/");
  }
  else if (message.includes("open instagram")) {
    speak("Opening Instagram..");
    window.open("https://www.instagram.com/");
  }
  else if (message.includes("open facebook")) {
    speak("Opening Facebook..");
    window.open("https://www.facebook.com/");
  }
  else if (message.includes("open calculator")) {
    speak("Opening calculator..");
    window.open("Calculator://");
  }
  else if (message.includes("open whatsapp")) {
    speak("Opening WhatsApp..");
    window.open("Whatsapp://");
  }
  else if (message.includes("time")) {
    let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
    speak(time);
  }
  else if (message.includes("date")) {
    let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
    speak(date);
  }


else {
  


  // Clean the message to extract ONLY the main topic
  let cleanMessage = message
    .replace("siri", "")
    .replace("tell me something about", "")
    .replace("tell me about", "")
    .replace("what is", "")
    .replace("who is", "")
    .replace("how can i", "")
    .replace("how to", "")
    .replace("explain", "")
    .replace("define", "")
    .trim();

  // Speak clean response
  let finalText = "I found this information regarding " + cleanMessage;

  speak(finalText);
  window.open(
    `https://www.google.com/search?q=${cleanMessage}`,
    "_blank"
  );
}


                   

 }    

