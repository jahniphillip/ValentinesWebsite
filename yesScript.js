document.addEventListener("DOMContentLoaded", () => {
  let confettiInterval;
  let fireworkInterval;
  let animationRunning = true;

  // ---------- CONFETTI ----------
  function launchConfetti() {
    confetti({
      particleCount: 120,
      spread: 360,
      origin: {
        x: Math.random(),
        y: Math.random() * 0.6
      },
      shapes: ["heart"],
      colors: ["#ff4d6d", "#ff758f", "#ffb3c6", "#ffffff"]
    });
  }

  confettiInterval = setInterval(launchConfetti, 1200);

  // ---------- FIREWORK CANVAS ----------
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  Object.assign(canvas.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    pointerEvents: "none",
    zIndex: "9999"
  });

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
      this.life = 90;
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

  fireworkInterval = setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.6;
    for (let i = 0; i < 40; i++) {
      fireworks.push(new HeartParticle(x, y));
    }
  }, 900);

  function animate() {
    if (!animationRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = fireworks.length - 1; i >= 0; i--) {
      const p = fireworks[i];
      p.update();
      p.draw();
      if (p.life <= 0) fireworks.splice(i, 1);
    }
    requestAnimationFrame(animate);
  }

  animate();

  // ---------- STOP AFTER 7 SECONDS ----------
  setTimeout(() => {
    animationRunning = false;
    clearInterval(confettiInterval);
    clearInterval(fireworkInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.remove();

    fadeOutOriginalText();
  }, 7000);

  // ---------- FADE OUT ORIGINAL TEXT ----------
  function fadeOutOriginalText() {
    const originalText = document.getElementById("typed-output3");

    if (originalText) {
      originalText.style.transition = "opacity 0.8s ease";
      originalText.style.opacity = "0";

      setTimeout(() => {
        originalText.remove();
        showTypingMessage();
      }, 800);
    } else {
      showTypingMessage();
    }
  }

  // ---------- TYPING TEXT ----------
  function showTypingMessage() {
    const text = "But wait! There's more...";
    let index = 0;

    const textEl = document.createElement("div");
    document.body.appendChild(textEl);

    Object.assign(textEl.style, {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: "2.2rem",
      fontWeight: "bold",
      color: "#ff4d6d",
      fontFamily: "sans-serif",
      zIndex: "10000",
      whiteSpace: "nowrap"
    });

    const typingInterval = setInterval(() => {
      textEl.textContent += text.charAt(index);
      index++;

      if (index === text.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
          textEl.remove();
          showVideo();
        }, 3000);
      }
    }, 80);
  }

  // ---------- VIDEO POP-IN ----------
  function showVideo() {
    const video = document.createElement("video");
    video.src = "surprise.mp4"; // change if needed
    video.autoplay = true;
    video.controls = true;
    video.playsInline = true;

    Object.assign(video.style, {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%) scale(0)",
      width: "80vw",
      maxWidth: "800px",
      zIndex: "10000",
      borderRadius: "16px",
      boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
      transition: "transform 0.6s ease"
    });

    document.body.appendChild(video);

    requestAnimationFrame(() => {
      video.style.transform = "translate(-50%, -50%) scale(1)";
    });
  }
});
