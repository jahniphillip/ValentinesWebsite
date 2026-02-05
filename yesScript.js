// =======================
// HEART FIREWORKS + CONFETTI
// Runs automatically on page load
// No HTML changes required
// =======================

document.addEventListener("DOMContentLoaded", () => {
  // ---------- CONFETTI ----------
  function launchConfetti() {
    confetti({
      particleCount: 150,
      spread: 360,
      origin: {
        x: Math.random(),
        y: Math.random() * 0.6
      },
      shapes: ["heart"],
      colors: ["#ff4d6d", "#ff758f", "#ffb3c6", "#ffffff"]
    });
  }

  setInterval(launchConfetti, 1200);

  // ---------- FIREWORKS ----------
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const fireworks = [];

  class HeartParticle {
    constructor(x, y) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 2;

      this.x = x;
      this.y = y;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.life = 100;
      this.size = Math.random() * 6 + 4;
      this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(this.size / 10, this.size / 10);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-5, -5, -10, 5, 0, 10);
      ctx.bezierCurveTo(10, 5, 5, -5, 0, 0);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life--;
    }
  }

  function spawnFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.6;

    for (let i = 0; i < 40; i++) {
      fireworks.push(new HeartParticle(x, y));
    }
  }

  setInterval(spawnFirework, 900);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = fireworks.length - 1; i >= 0; i--) {
      const p = fireworks[i];
      p.update();
      p.draw();

      if (p.life <= 0) {
        fireworks.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
});
