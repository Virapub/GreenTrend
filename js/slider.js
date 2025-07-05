// slider.js
window.addEventListener("DOMContentLoaded", () => {
  const slideContainer = document.getElementById("slides");

  const bannerImages = [
    "images/slide6.jpg",
    "images/slide7.jpg",
    "images/slide8.jpg",
    
  ];

  bannerImages.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Slide ${index + 1}`;
    slideContainer.appendChild(img);
  });
});
