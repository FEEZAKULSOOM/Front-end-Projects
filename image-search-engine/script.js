let input = document.querySelector(".search-box input");
let btn = document.querySelector(".btn button");
let images = document.querySelector(".images");
let loadBtn = document.querySelector("#load");

const accessKey = "gxcJRGK1WosA7zS9FdS1zf_3xMAl_PjNkLKFfoRz6js";
let page = 1;
let keyword = "";
function download(imgurl) {
  
    fetch(imgurl)
    .then(res => res.blob())
    .then(blob => {
      let a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "image-" + Date.now() + ".jpg";
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
    .catch(() => {
      alert("Failed to download!");
    });
}
async function getResponse() {
 
    keyword = input.value;

    let url = `https://api.unsplash.com/search/photos?page=${page}
    &query=${keyword}&client_id=${accessKey}&per_page=14`;

    let response = await fetch(url);

    if (!response.ok) {
        console.error("Error:", response.status);
        return;
    }

    let data = await response.json();
    let results=data.results;
       if (page ===1) {
        images.innerHTML="";
    }
    loadBtn.style.display="block";
    results.map((result) => {
        let li=document.createElement("li");
        li.classList.add("image");
    let html = `
  <img src="${result.urls.small}" alt="img">
  <div class="details">
    <div class="user">
      <img src="camera.svg" alt="img">
      <span>${result.user.name}</span>
    </div>
    <div class="download" onclick=download('${result.urls.small}')>
      <div class="image">
        <img src="download.svg" alt="img">


      </div>
    </div>
  </div>
`;
 li.innerHTML = html;
 images.appendChild(li);


    })
    console.log(results);
    console.log(data);
}
input.addEventListener("keyup" , (e)=> {
    page=1;
    if ( e.key==="Enter")
   { getResponse();}
});
btn.addEventListener("click", (e) => {
    page = 1;
    getResponse();
});
loadBtn.addEventListener("click" , ()=> {
      page++;
      getResponse();
})

