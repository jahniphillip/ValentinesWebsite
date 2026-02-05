document.addEventListener("DOMContentLoaded", function () {
    // Start the animation immediately
    startFireworks();
    
    // Initialize gallery (if you uncomment the HTML for it)
    if (document.getElementById("pics")) {
        setupGallery();
    }
});

function startFireworks() {
    const duration = 15 * 1000; // 15 seconds
    const animationEnd = Date.now() + duration;

    const defaults = { 
        startVelocity: 30, 
        spread: 360, 
        ticks: 60, 
        zIndex: 0, 
        shapes: ["heart"], // tsparticles bundle supports 'heart'
        colors: ["#FFC0CB", "#FF69B4", "#FF1493", "#C71585"],
        scalar: 2 // Slightly smaller for better performance
    };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Burst 1: Random position (Fireworks effect)
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.9), y: randomInRange(0.1, 0.4) }
        });

        // Burst 2: Side Cannon Left
        confetti({
            ...defaults,
            particleCount: 25,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 }
        });

        // Burst 3: Side Cannon Right
        confetti({
            ...defaults,
            particleCount: 25,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 }
        });

    }, 500); // Fires every half second
}

function setupGallery(){
    const images = [
        "./images/UsGallery/388ECE92-1F31-47C8-8714-CD10694DDFE4.jpg",
        "./images/UsGallery/IMG_0090.jpg",
        "./images/UsGallery/IMG_3444.jpg",
        "./images/UsGallery/IMG_3737.jpg",
        "./images/UsGallery/IMG_4437.JPG",
        "./images/UsGallery/IMG_6198.jpg",
        "./images/UsGallery/IMG_6321.jpg",
        "./images/UsGallery/IMG_7078.jpg",
        "./images/UsGallery/IMG_7352.mp4",
        "./images/UsGallery/IMG_9019.jpg",
        "./images/UsGallery/beMine.jpg",
    ];
    
    let currentIndex = 0;
    const galleryImg = document.getElementById("pics");
    const nextButton = document.getElementById("next-btn");
    const prevButton = document.getElementById("prev-btn");

    if (!galleryImg || !nextButton || !prevButton) return;

    function updateImage() {
        galleryImg.src = images[currentIndex];
    }
    
    updateImage();

    nextButton.addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    });

    prevButton.addEventListener("click", function () {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    });
}
