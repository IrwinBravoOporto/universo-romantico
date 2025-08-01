
const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

const stars = Array.from({ length: 300 }, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  z: Math.random() * width
}));

const shootingStars = [];

function drawStars() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "white";
  for (const star of stars) {
    let k = 128.0 / star.z;
    let x = (star.x - width / 2) * k + width / 2;
    let y = (star.y - height / 2) * k + height / 2;
    let size = (1 - star.z / width) * 2;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    star.z -= 2;
    if (star.z <= 0) {
      star.z = width;
    }
  }
}

function drawShootingStars() {
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const star = shootingStars[i];
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(star.x - star.dx * 10, star.y - star.dy * 10);
    ctx.stroke();

    star.x += star.dx;
    star.y += star.dy;

    if (star.x > width || star.y > height) {
      shootingStars.splice(i, 1);
    }
  }

  if (Math.random() < 0.02) {
    shootingStars.push({
      x: Math.random() * width,
      y: 0,
      dx: 4 + Math.random() * 2,
      dy: 4 + Math.random() * 2
    });
  }
}

function animate() {
  drawStars();
  drawShootingStars();
  requestAnimationFrame(animate);
}

animate();

const phrases = [
  "Te extraño 💫",
  "My love 💖",
  "Me encantas ✨",
  "Ojitos de baby perezosa 🦥💕",
  "Tu amor es mi universo 🌌",
  "Eres mi estrella fugaz 🌠"
];

let index = 0;
const loveText = document.getElementById("loveText");

function showPhrase() {
  loveText.classList.remove("show");
  setTimeout(() => {
    loveText.textContent = phrases[index];
    loveText.classList.add("show");
    index = (index + 1) % phrases.length;
  }, 500);
}

setInterval(showPhrase, 5000);
showPhrase();
