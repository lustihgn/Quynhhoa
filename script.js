// ===== NHẠC =====
const bgm = document.getElementById("bgm");

function startMusic() {
  bgm.volume = 0.5;
  bgm.play().catch(() => {});
  document.removeEventListener("click", startMusic);
  document.removeEventListener("touchstart", startMusic);
}

document.addEventListener("click", startMusic);
document.addEventListener("touchstart", startMusic);


// ===== SAO + POPUP =====
const stars = ["⭐","🌟","✨","💫","🌠","✦","✧"];

const cards = [
  { img:"anh1.jpg", text:"Chúc năm mới phát tài!" },
  { img:"anh2.jpg", text:"Gia đình hạnh phúc!" },
  { img:"anh3.jpg", text:"Xuân an khang!" },
  { img:"anh4.jpg", text:"Vạn sự như ý!" },
  { img:"anh5.jpg", text:"Sức khỏe dồi dào!" },
  { img:"anh6.jpg", text:"Thành công rực rỡ!" },
  { img:"anh7.jpg", text:"Niềm vui tràn đầy!" }
];

// preload ảnh (hiện ngay, không lag)
cards.forEach(card => {
  const img = new Image();
  img.src = card.img;
});

let lastIndex = -1;

const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupText = document.getElementById("popup-text");

function createStar() {
  const star = document.createElement("div");
  star.className = "star";
  star.textContent = stars[Math.floor(Math.random()*stars.length)];

  star.style.left = Math.random()*window.innerWidth + "px";
  star.style.fontSize = (24 + Math.random()*20) + "px";
  star.style.animationDuration = (6 + Math.random()*4) + "s";

  star.onclick = () => {
    let i;
    do {
      i = Math.floor(Math.random()*cards.length);
    } while (i === lastIndex);

    lastIndex = i;

    popupImg.src = cards[i].img;
    popupText.innerText = cards[i].text;
    popup.style.display = "flex";
  };

  document.body.appendChild(star);
  setTimeout(() => star.remove(), 12000);
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

popup.onclick = () => {
  popup.style.display = "none";
};
