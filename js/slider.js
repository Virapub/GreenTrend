window.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const slides = [
    { src: "images/slide1.jpg", title: "Slide 1", text: "Green Trend" },
    { src: "images/slide2.jpg", title: "Slide 2", text: "Green Trend" },
    { src: "images/slide3.jpg", title: "Slide 3", text: "Green Trend" }
  ];
  let currentSlide = 0;

  function createSlides() {
    slides.forEach((slide, index) => {
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
    const dotsContainer = document.querySelector(".slider-dots");
    dotsContainer.innerHTML = slides.map((_, idx) => `<span class="slider-dot ${idx === currentSlide ? "active" : ""}"></span>`).join("");
  }

  function showSlide(index) {
    const totalSlides = slides.length;
    if (index >= totalSlides) currentSlide = 0;
    else if (index < 0) currentSlide = totalSlides - 1;
    else currentSlide = index;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
  }

  document.querySelector(".prev-slide").addEventListener("click", () => showSlide(currentSlide - 1));
  document.querySelector(".next-slide").addEventListener("click", () => showSlide(currentSlide + 1));

  createSlides();
  setInterval(() => showSlide(currentSlide + 1), 5000); // Auto slide every 5 seconds
});
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
slider.style.width = `${slides.length * 100}vw`;
slides.forEach(slide => slide.style.width = "100vw");
