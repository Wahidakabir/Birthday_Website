// Variables as requested
let brotherName = "Bhaiya";
let candleLit = true;

console.log("Brother Name:", brotherName);
console.log("Candle Lit Status:", candleLit);

// 10 Picture Memories Data (You can replace these image URLs with your own photos later!)
const memories = [
    { url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80", caption: "Memory 1: Growing up together!" },
    { url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80", caption: "Memory 2: Unforgettable road trips." },
    { url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80", caption: "Memory 3: Celebrating achievements." },
    { url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80", caption: "Memory 4: Fun times and big laughs." },
    { url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80", caption: "Memory 5: Always having each other's back." },
    { url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80", caption: "Memory 6: Special family gatherings." },
    { url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&q=80", caption: "Memory 7: Late-night talks and planning." },
    { url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80", caption: "Memory 8: Adventures around every corner." },
    { url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=600&q=80", caption: "Memory 9: Exploring new places." },
    { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80", caption: "Memory 10: Here’s to many more years ahead!" }
];

let currentPhotoIndex = 0;

// DOM Elements
const blowButton = document.getElementById("blow-button");
const flame = document.getElementById("flame");
const birthdayMessage = document.getElementById("birthday-message");
const envelopeContainer = document.getElementById("envelope-container");
const envelope = document.getElementById("envelope");
const galleryModal = document.getElementById("gallery-modal");
const closeGallery = document.getElementById("close-gallery");
const galleryImg = document.getElementById("gallery-img");
const photoCaption = document.getElementById("photo-caption");
const photoCounter = document.getElementById("photo-counter");
const prevPhotoBtn = document.getElementById("prev-photo");
const nextPhotoBtn = document.getElementById("next-photo");

// Candle Blow Action
blowButton.addEventListener("click", () => {
    if (candleLit) {
        candleLit = false;
        console.log("Candle Lit Status:", candleLit);

        flame.classList.add("blown-out");
        blowButton.style.display = "none";
        birthdayMessage.style.display = "block";
        
        // Reveal envelope after short delay
        setTimeout(() => {
            envelopeContainer.style.display = "flex";
        }, 600);
    }
});

// Open Gallery when Envelope is Clicked
envelope.addEventListener("click", () => {
    currentPhotoIndex = 0;
    updateGalleryPhoto();
    galleryModal.style.display = "flex";
});

// Close Gallery Modal
closeGallery.addEventListener("click", () => {
    galleryModal.style.display = "none";
});

// Navigate Photos
nextPhotoBtn.addEventListener("click", () => {
    currentPhotoIndex = (currentPhotoIndex + 1) % memories.length;
    updateGalleryPhoto();
});

prevPhotoBtn.addEventListener("click", () => {
    currentPhotoIndex = (currentPhotoIndex - 1 + memories.length) % memories.length;
    updateGalleryPhoto();
});

function updateGalleryPhoto() {
    galleryImg.src = memories[currentPhotoIndex].url;
    photoCaption.textContent = memories[currentPhotoIndex].caption;
    photoCounter.textContent = `${currentPhotoIndex + 1} / ${memories.length}`;
}

console.log("My birthday website is connected!");