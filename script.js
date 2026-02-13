// ==========================
// PHÁO HOA
// ==========================

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

class Firework{
  constructor(){
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height*0.6;
    this.particles=[];
    this.color=`hsla(${Math.random()*360},80%,60%,0.8)`;

    for(let i=0;i<20;i++){
      this.particles.push({
        x:this.x,
        y:this.y,
        a:Math.random()*Math.PI*2,
        s:Math.random()*2,
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

let fireworks=[];

function animate(){
  ctx.fillStyle="rgba(0,0,20,0.2)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  if(Math.random()<0.03){
    fireworks.push(new Firework());
  }

  fireworks.forEach((f,i)=>{
    f.update();
    f.draw();
    if(!f.particles.length){
      fireworks.splice(i,1);
    }
  });

  requestAnimationFrame(animate);
}
animate();


// ==========================
// NHẠC
// ==========================

const bgm = document.getElementById("bgm");

function startMusic(){
  bgm.volume = 0.5;
  bgm.play().catch(()=>{});
  document.removeEventListener("click", startMusic);
  document.removeEventListener("touchstart", startMusic);
}

document.addEventListener("click", startMusic);
document.addEventListener("touchstart", startMusic);


// ==========================
// SAO RƠI
// ==========================

const stars=["✨","🌟","🎆","🎇"];

setInterval(()=>{
  const star=document.createElement("div");
  star.className="star";
  star.innerText=stars[Math.floor(Math.random()*stars.length)];
  star.style.left=Math.random()*window.innerWidth+"px";
  star.style.animationDuration=(8+Math.random()*4)+"s";
  document.body.appendChild(star);
  setTimeout(()=>star.remove(),12000);
},1200);


// ==========================
// LÌ XÌ SAU NHẠC
// ==========================

const lixiImages=["lixi1.jpg","lixi2.jpg","lixi3.jpg","lixi4.jpg"];
let lixiStarted=false;

bgm.addEventListener("ended",()=>{
  if(!localStorage.getItem("lixiTaken")){
    lixiStarted=true;
    dropLixi();
  }
});

function dropLixi(){
  if(!lixiStarted) return;
  if(localStorage.getItem("lixiTaken")) return;

  const img=lixiImages[Math.floor(Math.random()*lixiImages.length)];

  const card=document.createElement("img");
  card.src=img;
  card.className="lixi";
  card.style.left=Math.random()*window.innerWidth+"px";

  card.onclick=()=>{
    localStorage.setItem("lixiTaken",img);
    lixiStarted=false;
    document.querySelectorAll(".lixi").forEach(e=>e.remove());
    showPopup(img);
  };

  document.body.appendChild(card);
  setTimeout(()=>card.remove(),6000);
  setTimeout(dropLixi,900);
}


// ==========================
// POPUP
// ==========================

const popup=document.getElementById("popup");
const popupImg=document.getElementById("popup-img");
const popupText=document.getElementById("popup-text");

function showPopup(img){
  popupImg.src=img;
  popupText.innerText="🧧 Bạn đã nhận lì xì năm nay!";
  popup.style.display="flex";
}

popup.onclick=()=>{
  popup.style.display="none";
};
