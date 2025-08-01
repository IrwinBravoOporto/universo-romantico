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
  "Tus ojitos dulces me dan paz... como el mar en calma 🦀🌊",
  "Desde que te conocí, los días se sienten más suaves, más bonitos ✨",
  "Tu sonrisa es el mejor lugar para quedarme un rato 💫😊",
  "Solo llevamos un mes... pero mi corazón ya se siente en casa contigo 🏠💙",
  "Te extraño incluso cuando acabo de verte 🕰️💕",
  "Tenerte cerca es como una medicina que no sabía que necesitaba 💊💖",
  "Somos dos cangrejitos que se encontraron bajo la misma luna 🦀🌙",
  "Eres ternura pura... y eso me tiene completamente atrapado 💞",
  "Cuando no estás, hasta el silencio me habla de ti 🌌",
  "No sé si creo en el destino, pero el universo hizo algo bonito al cruzarnos ✨",
  "A tu lado, incluso los momentos simples se sienten especiales 🍃🤍",
  "Quiero más fines de semana contigo, más tardes mirando tus ojitos ☀️🦥",
  "Solo quiero verte, abrazarte, y que se detenga un rato el mundo 🤗",
  "Tu forma de cuidar, de mirar, de sonreír... todo me enamora poquito a poco 🩺🌷",
  "A veces creo que te soñé... y el universo me escuchó 💭🌠"
];

const phraseElement = document.querySelector('.phrase');

function rotatePhrases() {
  let currentIndex = 0;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % phrases.length;
    phraseElement.textContent = phrases[currentIndex];
  }, 10000);
}

rotatePhrases();

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
const imagePaths = [];


// Llenar el array con los nombres
for (let i = 1; i <= totalImages; i++) {
  imagePaths.push(`images/foto${i}.jpg`);
}

// Desordenar el array (Fisher-Yates shuffle)
for (let i = imagePaths.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [imagePaths[i], imagePaths[j]] = [imagePaths[j], imagePaths[i]];
}

function createImage(src) {
  const img = document.createElement("img");
  img.src = src;
  img.className = "floating-img";

  // Posición inicial aleatoria
  const startTop = Math.random() * 80;
  const startLeft = Math.random() * 80;

  img.style.top = `${startTop}%`;
  img.style.left = `${startLeft}%`;

  // Pequeño delay para que aparezcan con ritmo
  img.style.animationDelay = `${Math.random() * 5}s`;

  imageContainer.appendChild(img);

  // Opcional: eliminar imagen tras la animación
  setTimeout(() => {
    img.remove();
  }, 7000); // un poco más que la duración de la animación
}

function launchStarsForever() {
  const delay = Math.random() * 2000 + 1500; // entre 1.5s y 3.5s
  const randomImage = imagePaths[Math.floor(Math.random() * imagePaths.length)];
  createImage(randomImage);
  setTimeout(launchStarsForever, delay);
}

launchStarsForever();


// Crear imágenes de forma aleatoria sin repetir
imagePaths.forEach((path) => {
  createImage(path);
});

