// slider.js
window.addEventListener("DOMContentLoaded", () => {
  const slideContainer = document.getElementById("slides");

  const bannerImages = [
    "images/slide1.jpg",
    "images/slide2.jpg",
    "images/slide3.jpg",
    "images/slide4.jpg",
    "images/slide5.jpg"
  ];

  bannerImages.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Slide ${index + 1}`;
    slideContainer.appendChild(img);
  });
});
