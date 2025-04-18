const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 300;

// Define o tamanho do canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Cria estrelas com posições e velocidades aleatórias
for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    speedX: Math.random() * 0.2 - 0.1,
    speedY: Math.random() * 0.2 - 0.1,
    alpha: Math.random(),
    alphaChange: Math.random() * 0.02
  });
}

// Função para desenhar e animar as estrelas
function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let star of stars) {
    // Muda a opacidade para piscar
    star.alpha += star.alphaChange;
    if (star.alpha <= 0 || star.alpha >= 1) {
      star.alphaChange = -star.alphaChange;
    }

    // Move a estrela
    star.x += star.speedX;
    star.y += star.speedY;

    // Reposiciona se sair da tela
    if (star.x < 0) star.x = canvas.width;
    if (star.x > canvas.width) star.x = 0;
    if (star.y < 0) star.y = canvas.height;
    if (star.y > canvas.height) star.y = 0;

    // Desenha a estrela
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();
  }

  requestAnimationFrame(animateStars);
}

animateStars();
