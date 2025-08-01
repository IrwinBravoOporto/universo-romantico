const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// Estrellas y fugaces
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
    if (star.z <= 0) star.z = width;
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

  if (Math.random() < 0.015) {
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

// Frases
const phrases = [
  "Eres mi universo 💫",
  "Mi amor por ti no tiene fin 🌌",
  "Contigo las estrellas brillan más ✨",
  "Ojitos de baby perezosa 🦥💕",
  "Tu amor me eleva 💖",
  "Besos intergalácticos 💋"
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
setInterval(showPhrase, 6000);
showPhrase();

// Imágenes automáticas desde carpeta
const imageContainer = document.getElementById("imageContainer");

// Simula carga dinámica (GitHub Pages no permite leer archivos locales,
// así que las imagenes deben estar listadas manualmente en un array).
const totalImages = 4; // cambia este número si agregas más imágenes
for (let i = 1; i <= totalImages; i++) {
  const img = document.createElement("img");
  img.src = `images/foto${i}.jpg`; // asegúrate de seguir ese patrón
  img.className = "floating-img";
  img.style.top = `${Math.random() * 80}%`;
  img.style.left = `${Math.random() * 90}%`;
  img.style.animationDelay = `${Math.random() * 15}s`;
  imageContainer.appendChild(img);

  // Fade in delay
  setTimeout(() => {
    img.style.opacity = 1;
  }, 2000 + Math.random() * 3000);
}
``
