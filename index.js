const canvas = document.getElementById("liquid-cursor");
const ctx = canvas.getContext("2d");

let width, height;
let mouse = { x: 0, y: 0 };
let points = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

document.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

for (let i = 0; i < 20; i++) {
  points.push({ x: mouse.x, y: mouse.y, vx: 0, vy: 0 });
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  let prev = mouse;
  points.forEach(p => {
    p.vx += (prev.x - p.x) * 0.15;
    p.vy += (prev.y - p.y) * 0.15;
    p.vx *= 0.6;
    p.vy *= 0.6;
    p.x += p.vx;
    p.y += p.vy;
    prev = p;
  });

  ctx.beginPath();
  ctx.moveTo(mouse.x, mouse.y);
  points.forEach(p => ctx.lineTo(p.x, p.y));

  ctx.strokeStyle = "rgba(108, 204, 255, 0.6)";
  ctx.lineWidth = 12;
  ctx.lineCap = "round";
  ctx.stroke();

  requestAnimationFrame(animate);
}

animate();
