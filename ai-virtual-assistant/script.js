let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice   = document.querySelector("#voice");



function speak(text) {
  let text_speech = new SpeechSynthesisUtterance(text);
  text_speech.rate = 1;
  text_speech.pitch = 1;
  text_speech.volume = 1;
  
  text_speech.lang = "hi-GB";
  window.speechSynthesis.speak(text_speech);
}

function wishMe() {
  let day = new Date();
  let hours = day.getHours();
  let greeting;

  if (hours >= 0 && hours < 12) {
    greeting = "Good Morning Master";
  } else if (hours >= 12 && hours < 16) {
    greeting = "Good Afternoon Master";
  } else {
    greeting = "Good Evening Master";
  }

   // show on page
  speak(greeting);                  // speak it
}
  let greeted=false;
// Only run after user clicks the button
btn.addEventListener("click", () => {

  if (!greeted) {
    wishMe();
   
    greeted = true;
  }
});

let speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition;
 let recognition =  new speechRecognition();
 recognition.onresult=((event) => {
  let currentIndex=event.resultIndex;
  let transcript=event.results[currentIndex][0].transcript;
  content.innerText=transcript;
   takeCommand(transcript.toLowerCase());
 });

 btn.addEventListener("click" , ()=> {
  recognition.start();
  btn.style.display="none";
  voice.style.display="block";


 })

 function takeCommand(message) {
    btn.style.display="flex";
  voice.style.display="none";
   if(message.includes("hello")) {
     speak("hello , fiza how can I help you!");
   }
   else if  (message.includes("who are you")) {
     speak("I am a virtual assistant created by Fiza Fareed!");
    
   }
    else if (message.includes("open youtube")) {
      speak("opening Youtube..")
      window.open("https://www.youtube.com/");
    }
    else if (message.includes("open google")) {
      speak("opening google..")
      window.open("https://www.google.com/");
    }
    else if (message.includes("open instagram")) {
      speak("opening instagram..")
      window.open("https://www.instagram.com/");
    }
    else if (message.includes("open facebook")) {
      speak("opening facebook..")
      window.open("https://www.facebook.com/");
    }
    else if (message.includes("open calculator")) {
      speak("opening calculator..")
      window.open("Calculator://");
    }
    else if (message.includes("open whatsapp")) {
      speak("opening whatsapp..")
      window.open("Whatsapp://");
    }
    else if (message.includes("time")) {
     let time= new Date().toLocaleString(undefined ,{hour:"numeric" , minute :"numeric"});
     speak(time);
    }
    else if (message.includes("date")) {
     let date= new Date().toLocaleString(undefined ,{day:"numeric" , month:"short"});
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