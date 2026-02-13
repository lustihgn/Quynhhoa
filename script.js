// ============================
// ===== NHẠC CHẠY 2 LẦN =====
// ============================

const bgm = document.getElementById("bgm");
let playCount = 0;

// Click lần đầu để chạy nhạc
function startMusic() {
  bgm.volume = 0.5;
  bgm.play().catch(()=>{});
  document.removeEventListener("click", startMusic);
  document.removeEventListener("touchstart", startMusic);
}

document.addEventListener("click", startMusic);
document.addEventListener("touchstart", startMusic);

// Khi nhạc kết thúc
bgm.onended = () => {
  playCount++;

  if (playCount < 2) {
    bgm.currentTime = 0;
    bgm.play();
  } else {
    // Sau khi chạy đủ 2 lần → bắt đầu lì xì
    if (!localStorage.getItem("lixiDaChon")) {
      startLiXi();
    }
  }
};


// ===================================
// ===== PHẦN SAO RƠI (GIỮ NGUYÊN) ====
// ===================================

const tetItems = ["🎆","✨","🎇","🌟"];

const cards = [
  { img:"anh1.jpg", text:"Chúc năm mới phát tài!" },
  { img:"anh2.jpg", text:"Gia đình hạnh phúc!" },
  { img:"anh3.jpg", text:"Xuân an khang!" },
  { img:"anh4.jpg", text:"Vạn sự như ý!" },
  { img:"anh5.jpg", text:"Sức khỏe dồi dào!" },
  { img:"anh6.jpg", text:"Thành công rực rỡ!" },
  { img:"anh7.jpg", text:"Niềm vui tràn đầy!" }
];

let lastIndex = -1;
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupText = document.getElementById("popup-text");

function createTetItem() {
  const item = document.createElement("div");
  item.className = "flower";
  item.textContent = tetItems[Math.floor(Math.random()*tetItems.length)];
  item.style.left = Math.random()*innerWidth + "px";
  item.style.animationDuration = 8 + Math.random()*3 + "s";

  item.onclick = () => {
    let i;
    do {
      i = Math.floor(Math.random()*cards.length);
    } while (i === lastIndex);
    lastIndex = i;

    popupImg.classList.remove("show");
    popupImg.src = cards[i].img;
    popupText.innerText = cards[i].text;
    popup.style.display = "flex";

    setTimeout(()=>popupImg.classList.add("show"),50);
  };

  document.body.appendChild(item);
  setTimeout(()=>item.remove(),13000);
}

setInterval(createTetItem,1000);
popup.onclick = () => popup.style.display="none";


// ===========================
// ===== LÌ XÌ RƠI SAU ======
// ===========================

const lixiImages = [
  "lixi1.jpg",
  "lixi2.jpg",
  "lixi3.jpg",
  "lixi4.jpg"
];

function startLiXi(){
  setInterval(createLiXi,800);
}

function createLiXi(){
  if(localStorage.getItem("lixiDaChon")) return;

  const randomIndex = Math.floor(Math.random()*lixiImages.length);
  const imgName = lixiImages[randomIndex];

  const card = document.createElement("img");
  card.src = imgName;
  card.className = "lixi";
  card.style.left = Math.random()*innerWidth + "px";

  card.onclick = () => {
    localStorage.setItem("lixiDaChon", imgName);
    document.querySelectorAll(".lixi").forEach(el=>el.remove());
    showLiXi(imgName);
  };

  document.body.appendChild(card);
  setTimeout(()=>card.remove(),6000);
}

function showLiXi(img){
  popupImg.src = img;
  popupText.innerText = "🧧 Bạn đã nhận lì xì năm nay!";
  popup.style.display = "flex";
}
