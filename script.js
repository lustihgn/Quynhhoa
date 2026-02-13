// ===== NHẠC TỰ CHẠY KHI CLICK =====
const bgm = document.getElementById("bgm");

function startMusic() {
  bgm.volume = 0.5;
  bgm.play().catch(() => {});
  document.removeEventListener("click", startMusic);
  document.removeEventListener("touchstart", startMusic);
}

document.addEventListener("click", startMusic);
document.addEventListener("touchstart", startMusic);


// ===== NGÔI SAO RƠI + POPUP =====

// Các loại sao
const stars = ["⭐","🌟","✨","💫","🌠","✦","✧"];

// Danh sách ảnh + lời chúc
const cards = [
  { img:"anh1.jpg", text:"Chúc năm mới phát tài!" },
  { img:"anh2.jpg", text:"Gia đình hạnh phúc!" },
  { img:"anh3.jpg", text:"Xuân an khang!" },
  { img:"anh4.jpg", text:"Vạn sự như ý!" },
  { img:"anh5.jpg", text:"Sức khỏe dồi dào!" },
  { img:"anh6.jpg", text:"Thành công rực rỡ!" },
  { img:"anh7.jpg", text:"Niềm vui tràn đầy!" }
];

// ===== PRELOAD ẢNH (GIÚP HIỆN NGAY KHÔNG LAG) =====
cards.forEach(card => {
  const img = new Image();
  img.src = card.img;
});

let lastIndex = -1;

const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupText = document.getElementById("popup-text");

// Tạo sao rơi
function createStar() {
  const star = document.createElement("div");
  star.className = "flower"; // giữ nguyên class CSS cũ
  star.textContent = stars[Math.floor(Math.random()*stars.length)];

  star.style.left = Math.random() * innerWidth + "px";
  star.style.animationDuration = 6 + Math.random()*4 + "s";
  star.style.fontSize = 24 + Math.random()*20 + "px";

  star.onclick = () => {
    let i;
    do {
      i = Math.floor(Math.random()*cards.length);
    } while (i === lastIndex);

    lastIndex = i;

    // Hiện ảnh ngay lập tức (không delay)
    popupImg.src = cards[i].img;
    popupText.innerText = cards[i].text;

    popupImg.classList.add("show");
    popup.style.display = "flex";
  };

  document.body.appendChild(star);
  setTimeout(() => star.remove(), 12000);
}

setInterval(createStar, 800);

// Đóng popup
popup.onclick = () => {
  popup.style.display = "none";
  popupImg.classList.remove("show");
};
