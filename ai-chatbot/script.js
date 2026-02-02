let prompt = document.querySelector("#prompt");
let submitBtn = document.querySelector("#submit");
let chatContainer = document.querySelector(".chat-container");
let imageBtn = document.querySelector("#image");
let image = document.querySelector("#image img");
let imageInput = document.querySelector("#image input");

const api_url="https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=AIzaSyD32yMsY6gpGXf1fradNm3WX7KfsMNzaNM";

let file; // selected image file

let user = {
  message: null,
  file: {
    mime_type: null,
    data: null
  }
};

async function generateResponse(aiChatBox) {
  let text = aiChatBox.querySelector(".ai-chat-area");

  let requestOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: user.message },
            user.file.data ? [{ inlineData: user.file }] : []
          ]
        }
      ]
    })
  };

  try {
    let response = await fetch(api_url, requestOption);
    let data = await response.json();
   if (!data.candidates || !data.candidates.length) {
  text.innerHTML = "⚠️ API limit reached. Please try again later.";
  return;
}

let apiResponse =
  data.candidates[0].content.parts[0].text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .trim();

text.innerHTML = apiResponse;

  } catch (error) {
    console.log(error);
  } finally {
    chatContainer.scrollTo({
      top: chatContainer.scrollHeight,
      behavior: "smooth"
    });
          image.src = "img.svg"     // preview in SVG img
      image.classList.remove("choose"); 
      user.file={};
  }
}

function createChatBox(html, classes) {
  let div = document.createElement("div");
  div.innerHTML = html;
  div.classList.add(classes);
  return div;
}

function handleChatResponse(msg) {
  user.message = msg;

  let html = `
    <img src="user.svg" alt="" id="user-image" width="8%">
    <div class="user-chat-area">
      ${user.message}
      ${
        user.file.data
          ? `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" />`
          : ""
      }
    </div>
  `;

  prompt.value = "";
  let userChatBox = createChatBox(html, "user-chat-box");
  chatContainer.appendChild(userChatBox);

  chatContainer.scrollTo({
    top: chatContainer.scrollHeight,
    behavior: "smooth"
  });

  setTimeout(() => {
    let html = `
      <img src="ai.svg" alt="" id="ai-image" width="10%">
      <div class="ai-chat-area">
        <img src="loading.gif" alt="" class="load" width="50px">
      </div>
    `;
    let aiChatBox = createChatBox(html, "ai-chat-box");
    chatContainer.appendChild(aiChatBox);
    generateResponse(aiChatBox);
  }, 600);
}



submitBtn.addEventListener("click" , ()=> {
  handleChatResponse(prompt.value);
})
// 🔹 FIXED: preview image immediately when selected
imageInput.addEventListener("change", () => {
  file = imageInput.files[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = (e) => {
      image.src = e.target.result;      // preview in SVG img
      image.classList.add("choose");     // optional styling
    };
    reader.readAsDataURL(file);
  }
});

prompt.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        let base64string = e.target.result.split(",")[1];
        user.file = {
          mime_type: file.type,
          data: base64string
        };
        handleChatResponse(prompt.value);
      };
      reader.readAsDataURL(file);
    } else {
      handleChatResponse(prompt.value);
    }
  }
});

imageBtn.addEventListener("click", () => {
  imageInput.click();
});
