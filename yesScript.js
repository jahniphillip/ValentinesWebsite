document.addEventListener("DOMContentLoaded", function () {
    // Start the fireworks animation immediately
    startFireworks();

    // Only set up the gallery if the elements actually exist in the HTML
    const galleryImg = document.getElementById("pics");
    if (galleryImg) {
        setupGallery();
    }
});

function startFireworks() {
    const duration = 15 * 1000; // Plays for 15 seconds
    const animationEnd = Date.now() + duration;

    const defaults = { 
        startVelocity: 30, 
        spread: 360, 
        ticks: 60, 
        zIndex: 1000, 
        shapes: ["heart"],
        colors: ["#FFC0CB", "#FF69B4", "#FF1493", "#C71585"], 
        scalar: 2 
    };

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Fireworks effect: Bursts at random spots on the screen
        confetti({
            ...defaults,
            particleCount,
            origin: { 
                x: Math.random() * (0.8 - 0.2) + 0.2, // Random horizontal
                y: Math.random() - 0.2 // Random vertical
            }
        });
    }, 250);
}

function setupGallery() {
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

    function updateImage() {
        if (galleryImg) galleryImg.src = images[currentIndex];
    }

    updateImage();

    if (nextButton) {
        nextButton.addEventListener("click", function () {
            currentIndex = (currentIndex + 1) % images.length;
            updateImage();
        });
    }

    if (prevButton) {
        prevButton.addEventListener("click", function () {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateImage();
        });
    }
}
