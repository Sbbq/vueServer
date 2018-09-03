//by zk
/*
keypoint animation
1.初始位置，每个点的初始方向和初始步进，初始时每个点亮度为白色
2.炸开，按照初始速度设置的步进炸开
3.减缓，步进根据自身递减damping%
4.下落，全程都有。
*/

const PraticleNum=100;
const PraticleLife=600;
const PraticleSpeed=0.02;
const PraticleInitSpeed=4.5;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const GRAVITY = 9.8;
let loop=()=>{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  praticles.forEach((praticle,i)=>{
    praticle.animation();
    praticle.render();
  });
  praticles.forEach((praticle,i)=>{
    if(praticle.x>=canvas.width|| praticle.y>=canvas.height || praticle.x<=0 || praticle.y<=0 || praticle.alpha<=0){
      praticles.splice(i,1);
    }
  });
  requestAnimationFrame(loop);
}
let CreatePraticles=(x = Math.random() * canvas.width,
  y = Math.random() * canvas.height)=>{
  let r=150+~~(Math.random()*105);
  let g=150+~~(Math.random()*105);
  let b=150+~~(Math.random()*105);
  let speed=Math.random()*2+PraticleSpeed;
  let maxSpeed=speed;
  for(let i=0;i<PraticleNum;i++){
    let p=new Praticle(x,y,r,g,b,speed,false);
    praticles.push(p);
    maxSpeed=maxSpeed>speed?maxSpeed:speed;
  }
  for(let i=0;i<70;i++){
    let p=new Praticle(x,y,r,g,b,maxSpeed,true);
    praticles.push(p); 
  }
}

class Praticle{
  constructor(x,y,r,g,b,speed,isEdge){
    this.x=x;
    this.y=y;
    this.r=r;
    this.g=g;
    this.b=b;
    this.alpha=0.01;
    this.radius=1 + Math.random();
    this.startTime=(new Date()).getTime();
    this.duration=Math.random() * 300 + PraticleLife;
    this.currentDuration = 0;
    this.angle = Math.random() * 360;
    this.speed=(Math.random() * speed) + 0.1;
    this.baseX=Math.cos(this.angle)*this.speed;
    this.baseY=Math.sin(this.angle)*this.speed;
    this.dampening = 30; 
    if(isEdge){
      this.speed=speed;
      this.baseX=Math.cos(this.angle)*this.speed;
      this.baseY=Math.sin(this.angle)*this.speed;
    }
    this.initX=this.baseX;
    this.initY=this.baseY;
    this.colour = this.getColor();
  }

  animation(){
    this.currentDuration=(new Date()).getTime()-this.startTime;
    if(this.currentDuration<200){
      this.x+=this.initX*PraticleInitSpeed;
      this.y+=this.initY*PraticleInitSpeed;
      this.alpha += 0.01;
      this.colour = this.getColor(240, 240, 240, 0.9);
    }
    else{
      this.x+=this.baseX;
      this.y+=this.baseY;
      this.colour = this.getColor(this.red, this.green, this.blue, 0.4 + (Math.random() * 0.3));
    }
    this.baseY += GRAVITY / 1000;
    if(this.currentDuration>this.duration){
      this.baseX-=this.baseX/this.dampening;
      this.baseY-=this.baseY/this.dampening;
    }
    if (this.currentDuration >= this.duration + this.duration / 1.1) {

      this.alpha -= 0.02;
      this.colour = this.getColor();

    } else {

      if (this.alpha < 1) {
        this.alpha += 0.03;
      }

    }
  }

  render(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.lineWidth = this.lineWidth;
    ctx.shadowBlur = 8;
    ctx.shadowColor = this.getColor(this.r, this.g, this.b, 1);
    ctx.fillStyle = this.getColor();
    ctx.fill();
  }

  getColor(r,g,b,alpha){
    return `rgba(${r||this.r},${g||this.g},${b||this.b},${alpha||this.alpha})`
  }
}

let updateCanvasSize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};


// run it!

updateCanvasSize();
$(window).resize(updateCanvasSize);
/*sert.forEach((praticle,index)=>{
  praticle.animation();
    praticle.render();
})*/
let praticles=[];
$(canvas).on('click', (e) => {

  CreatePraticles(e.clientX, e.clientY);
});
loop();