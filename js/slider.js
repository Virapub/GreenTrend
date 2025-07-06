window.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const dotsContainer = document.getElementById("sliderDots");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const slides = [
    {
      src: "images/slide1.jpg",
      title: "Smart Blender",
      text: "High-speed kitchen blender with multiple modes",
      link: "products.html"
    },
    {
      src: "images/slide2.jpg",
      title: "Touchless Dispenser",
      text: "Automatic soap dispenser for hygienic kitchens",
      link: "products.html"
    },
    {
      src: "images/slide3.jpg",
      title: "Magnetic Shelf Rack",
      text: "Organize your fridge with magnetic storage",
      link: "products.html"
    }
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
          <a href="${slide.link}" class="slide-btn">Shop Now</a>
        </div>
      `;
      slider.appendChild(slideDiv);
    });

    updateDots();
    showSlide(currentSlide);
  }

  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = "";
    slides.forEach((_, idx) => {
      const dot = document.createElement("span");
      dot.className = "slider-dot" + (idx === currentSlide ? " active" : "");
      dot.addEventListener("click", () => showSlide(idx));
      dotsContainer.appendChild(dot);
    });
  }

  function showSlide(index) {
    const totalSlides = slides.length;
    if (index >= totalSlides) currentSlide = 0;
    else if (index < 0) currentSlide = totalSlides - 1;
    else currentSlide = index;

    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
  }

  prevBtn?.addEventListener("click", () => showSlide(currentSlide - 1));
  nextBtn?.addEventListener("click", () => showSlide(currentSlide + 1));

  createSlides();

  // Auto slide every 5 seconds
  setInterval(() => showSlide(currentSlide + 1), 5000);
});
