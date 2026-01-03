# 🚨 Regex Spam Checker

A smart **JavaScript-based Spam Detection project** that uses **Regular Expressions (Regex)** to identify suspicious messages.  
It detects spam patterns where letters are replaced with numbers or symbols to bypass filters.

---

## ✨ Features

✅ Detects spam words like **free money**, **help**, **stock alert**  
✅ Handles **number-letter replacements** (`e → 3`, `o → 0`, `a → @`)  
✅ Uses **character classes** for flexible matching  
✅ Uses **non-capturing groups** for performance  
✅ Matches **whole words only** (no false positives)  
✅ Beginner-friendly & well-structured code  

---

## 🧠 How It Works

Spam messages often disguise words like this:

| Original | Disguised |
|--------|-----------|
| free   | fr33 |
| money  | m0n3y |
| stock  | 5t0ck |
| alert  | @l3r7 |

This project uses **Regex character classes** and **non-capturing groups** to catch them all.

---

## 🧪 Example Spam Messages Detected

fr33 m0n3y waiting for you
5t0ck @l3r7 act now
FREE money offer
fre3 mon3y now


---

## ❌ Messages That Are NOT Spam

I am going to the bookstore
Let's talk about stocks tomorrow
Can you help me with this problem?



---

## 🛠️ Technologies Used

- **HTML**
- **CSS**
- **JavaScript (ES6)**
- **Regular Expressions (Regex)**

---

## 📂 Project Structure

regex-spam-detector/
│
├── index.html
├── style.css
├── script.js
└── README.md

---
## 📌 Core Regex Logic (Simplified)

- **Character Classes** → `[e3]`, `[o0]`, `[a@4]`
- **Non-Capturing Groups** → `(?:\s|^)`
- **Whole Word Matching** → prevents partial matches
