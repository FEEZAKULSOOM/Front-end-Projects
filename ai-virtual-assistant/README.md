# 🤖 Virtual AI Voice Assistant (Siri)

A browser-based **Virtual AI Voice Assistant** built using **HTML, CSS, and JavaScript**.  
It can listen to voice commands, speak responses, open websites, tell time/date, and intelligently search the internet — similar to a real virtual assistant.

---

## ✨ Features

- 🎤 Voice recognition (Speech-to-Text)
- 🔊 Text-to-speech responses
- 👋 Greets user only once per session
- 🌐 Opens websites (YouTube, Google, Instagram, Facebook, etc.)
- ⏰ Tells current time and date
- 🧠 Smart query cleaning (removes extra words like “what is”, “tell me about”)
- 🔍 Searches only the **main topic**, not the full sentence
- 🤖 Human-like assistant responses

---

## 🛠️ Technologies Used

- HTML
- CSS
- JavaScript
- Web Speech API
  - `SpeechRecognition`
  - `SpeechSynthesisUtterance`

---

## 🚀 How to Run the Project

> ⚠️ **Important:** This project will NOT work properly if opened directly as a file.

### ✅ Recommended Way (Best)

1. Open the project in **VS Code**
2. Install **Live Server** extension
3. Right-click `index.html`
4. Click **Open with Live Server**
5. Use **Google Chrome** or **Microsoft Edge**

---

## 🔐 Permissions Required

When the page opens:
- Allow **Microphone**
- Allow **Sound / Audio**

(Click the 🔒 lock icon in the browser address bar)

---

## 🗣️ Example Voice Commands

| Command | Response |
|------|---------|
| Hello | Greets the user |
| Who are you | Assistant introduction |
| Open YouTube | Opens YouTube |
| What is JavaScript | Searches JavaScript |
| Tell me something about hygiene | Searches hygiene |
| What time is it | Tells current time |
| What is today’s date | Tells date |
| How can you help me | Explains assistant features |

---

## 🧠 Smart Behavior

- Assistant **does not repeat greetings**
- Removes unnecessary words like:
  - “what is”
  - “tell me something about”
  - “siri / shipra / sifra”
- Speaks only **clean, meaningful information**
- Acts like a **real virtual assistant**

---

## 📁 Project Structure

/virtual-assistant
│── index.html
│── style.css
│── script.js
│── README.md
