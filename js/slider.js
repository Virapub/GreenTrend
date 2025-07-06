// slider.js
window.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const dotsContainer = document.querySelector(".slider-dots");
  const slides = [
    { src: "images/slide1.jpg", title: "Smart Juicer", text: "Extracts juice in seconds!" },
    { src: "images/slide2.jpg", title: "Multi-Cooker", text: "Cook fast with smart presets." },
    { src: "images/slide3.jpg", title: "Blender Pro", text: "Smooth blending, easy cleaning." }
  ];

  let currentSlide = 0;

  function createSlides() {
    slides.forEach((slide) => {
      const slideDiv = document.createElement("div");
      slideDiv.className = "slide";
      slideDiv.innerHTML = `
        <img src="${slide.src}" alt="${slide.title}">
        <div class="slide-content">
          <h3>${slide.title}</h3>
          <p>${slide.text}</p>
          <a href="products.html" class="slide-btn">Shop Now</a>
        </div>
      `;
      slider.appendChild(slideDiv);
    });
    updateDots();
    showSlide(currentSlide);
  }

  function updateDots() {
    dotsContainer.innerHTML = "";
    slides.forEach((_, idx) => {
      const dot = document.createElement("span");
      dot.className = "slider-dot" + (idx === currentSlide ? " active" : "");
      dot.addEventListener("click", () => showSlide(idx));
      dotsContainer.appendChild(dot);
    });
  }

  function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
  }

  document.querySelector(".prev-slide").addEventListener("click", () => showSlide(currentSlide - 1));
  document.querySelector(".next-slide").addEventListener("click", () => showSlide(currentSlide + 1));

  createSlides();
  setInterval(() => showSlide(currentSlide + 1), 5000); // Auto-slide
});
