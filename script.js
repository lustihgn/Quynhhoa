// ===== NHẠC =====
const bgm = document.getElementById("bgm");
const startMusic = () => {
  bgm.volume = 0.5;
  bgm.play().catch(()=>{});
  document.removeEventListener("click", startMusic);
};
document.addEventListener("click", startMusic);

// ===== DATA =====
const cards = [
  { img:"anh1.jpg", text:"Chúc năm mới phát tài!" },
  { img:"anh2.jpg", text:"Gia đình hạnh phúc!" },
  { img:"anh3.jpg", text:"Xuân an khang!" },
  { img:"anh4.jpg", text:"Vạn sự như ý!" },
  { img:"anh5.jpg", text:"Sức khỏe dồi dào!" },
  { img:"anh6.jpg", text:"Thành công rực rỡ!" },
  { img:"anh7.jpg", text:"Niềm vui tràn đầy!" }
];

const starTypes = ["⭐","🌟","✨","✦","✧"];

// ===== PRELOAD ẢNH (CỰC QUAN TRỌNG) =====
const imageCache = {};
cards.forEach(c => {
  const img = new Image();
  img.src = c.img;
  imageCache[c.img] = img;
});

// ===== POPUP =====
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupText = document.getElementById("popup-text");

popup.onclick = () => popup.style.display = "none";

// ===== SAO RƠI =====
let lastIndex = -1;

function createStar() {
  const star = document.createElement("div");
  star.className = "star";
  star.textContent = starTypes[Math.floor(Math.random()*starTypes.length)];

  const size = 18 + Math.random()*26;
  star.style.fontSize = size + "px";
  star.style.left = Math.random()*innerWidth + "px";
  const dur = 6 + Math.random()*6;
  star.style.animationDuration = dur + "s";

  star.onclick = () => {
    let i;
    do { i = Math.floor(Math.random()*cards.length); }
    while(i === lastIndex);
    lastIndex = i;

    popup.style.display = "flex";
    popupText.innerText = cards[i].text;
    popupImg.classList.remove("show");
    popupImg.src = imageCache[cards[i].img].src;

    if (popupImg.complete) {
      popupImg.classList.add("show");
    } else {
      popupImg.onload = () => popupImg.classList.add("show");
    }
  };

  document.body.appendChild(star);
  setTimeout(() => star.remove(), dur*1000);
}

setInterval(createStar, 700);

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
  constructor(){
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height*0.6;
    this.p = Array.from({length:20},()=>({
      x:this.x,y:this.y,
      a:Math.random()*Math.PI*2,
      s:Math.random()*1.5+0.5,
      l:60
    }));
    this.c = `hsla(${Math.random()*360},80%,65%,0.8)`;
  }
  update(){
    this.p.forEach(e=>{
      e.x+=Math.cos(e.a)*e.s;
      e.y+=Math.sin(e.a)*e.s;
      e.l--;
    });
    this.p=this.p.filter(e=>e.l>0);
  }
  draw(){
    this.p.forEach(e=>{
      ctx.beginPath();
      ctx.arc(e.x,e.y,1.5,0,Math.PI*2);
      ctx.fillStyle=this.c;
      ctx.fill();
    });
  }
}

let fireworks=[];
(function animate(){
  ctx.fillStyle="rgba(0,0,20,0.2)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  if(Math.random()<0.04) fireworks.push(new Firework());
  fireworks.forEach((f,i)=>{
    f.update(); f.draw();
    if(!f.p.length) fireworks.splice(i,1);
  });
  requestAnimationFrame(animate);
})();
