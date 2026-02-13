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


// ===== POPUP + VẬT RƠI =====
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

    setTimeout(() => popupImg.classList.add("show"), 50);
  };

  document.body.appendChild(item);
  setTimeout(() => item.remove(), 13000);
}

setInterval(createTetItem, 1000);
popup.onclick = () => popup.style.display = "none";


// ===== PHÁO HOA =====
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

class Firework {
  constructor() {
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height*0.6;
    this.particles = [];
    this.color = `hsla(${Math.random()*360},80%,65%,0.8)`;

    for(let i=0;i<20;i++){
      this.particles.push({
        x:this.x,
        y:this.y,
        a:Math.random()*Math.PI*2,
        s:Math.random()*1.5+0.5,
        l:60
      });
    }
  }

  update(){
    this.particles.forEach(p=>{
      p.x+=Math.cos(p.a)*p.s;
      p.y+=Math.sin(p.a)*p.s;
      p.l--;
    });
    this.particles=this.particles.filter(p=>p.l>0);
  }

  draw(){
    this.particles.forEach(p=>{
      ctx.beginPath();
      ctx.arc(p.x,p.y,1.5,0,Math.PI*2);
      ctx.fillStyle=this.color;
      ctx.fill();
    });
  }
}

let fireworks = [];

function animate(){
  ctx.fillStyle="rgba(0,0,20,0.2)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  if(Math.random()<0.04) fireworks.push(new Firework());

  fireworks.forEach((f,i)=>{
    f.update();
    f.draw();
    if(!f.particles.length) fireworks.splice(i,1);
  });

  requestAnimationFrame(animate);
}

animate();
// ===========================
// ===== LÌ XÌ SAU NHẠC =====
// ===========================

// Danh sách ảnh lì xì
const lixiImages = [
  "lixi1.jpg",
  "lixi2.jpg",
  "lixi3.jpg",
  "lixi4.jpg"
];

// Khi nhạc kết thúc → bắt đầu lì xì
bgm.onended = () => {
  if (!localStorage.getItem("lixiDaChon")) {
    startLiXi();
  }
};

function startLiXi(){
  setInterval(createLiXi, 800);
}

function createLiXi(){
  if(localStorage.getItem("lixiDaChon")) return;

  const img = lixiImages[Math.floor(Math.random()*lixiImages.length)];

  const card = document.createElement("img");
  card.src = img;
  card.className = "lixi";
  card.style.left = Math.random()*innerWidth + "px";

  card.onclick = () => {
    localStorage.setItem("lixiDaChon", img);

    document.querySelectorAll(".lixi").forEach(el => el.remove());

    popupImg.src = img;
    popupText.innerText = "🧧 Bạn đã nhận lì xì năm nay!";
    popup.style.display = "flex";
  };

  document.body.appendChild(card);
  setTimeout(()=>card.remove(),6000);
}
