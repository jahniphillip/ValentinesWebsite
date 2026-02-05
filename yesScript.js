
document.addEventListener("DOMContentLoaded", function () {
    startConfetti(); // Start confetti animation on page load
    setupGallery();  // Initialize photo gallery
});

function startConfetti() {
    const duration = 15 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 20, spread: 360, ticks: 60, zIndex: 0, shapes: ["heart"],
    colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"], scalar: 2.25};

    function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
        return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // since particles fall down, start a bit higher than random
    confetti(
        Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
    );
    confetti(
        Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
    );
    }, 250);
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
    ];
    
    let currentIndex = 0;
    const galleryImg = document.getElementById("pics");
    const nextButton = document.getElementById("next-btn");
    const prevButton = document.getElementById("prev-btn");

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

    // updateImage(); // Set initial image

}
