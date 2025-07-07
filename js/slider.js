document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const dotsContainer = document.getElementById("sliderDots");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  // Only run slider script if all necessary elements are present
  if (!slider || !dotsContainer || !prevBtn || !nextBtn) {
    console.warn("Slider elements not found. Skipping slider initialization.");
    return;
  }

  const slidesData = [
    {
      src: "images/slider1.jpg", // Corrected image name based on your first index.html
      title: "Smart Blender",
      text: "High-speed kitchen blender with multiple modes and smart features.",
      link: "products.html"
    },
    {
      src: "images/slide2.jpg",
      title: "Touchless Dispenser",
      text: "Automatic soap dispenser for hygienic kitchens and bathrooms.",
      link: "products.html"
    },
    {
      src: "images/slide3_20250706_173751_0000.jpg", // Assuming this is the correct path for your third slide
      title: "Magnetic Shelf Rack",
      text: "Organize your fridge with strong magnetic storage solutions.",
      link: "products.html"
    }
  ];

  let currentSlide = 0;
  let slideInterval; // Variable to store the interval ID

  function createSlides() {
    slider.innerHTML = ''; // Clear any existing static slide (from index.html initial setup)
    slidesData.forEach((slide, index) => {
      const slideDiv = document.createElement("div");
      slideDiv.className = "slide";
      slideDiv.innerHTML = `
        <img src="${slide.src}" alt="${slide.title}" loading="lazy">
        <div class="slide-content">
          <h3>${slide.title}</h3>
          <p>${slide.text}</p>
          <a href="${slide.link}" class="slide-btn" aria-label="Shop now for ${slide.title}">Shop Now</a>
        </div>
      `;
      slider.appendChild(slideDiv);
    });

    updateDots();
    showSlide(currentSlide); // Ensure the first slide is shown initially
    startAutoSlide(); // Start auto sliding after creating slides
  }

  function updateDots() {
    dotsContainer.innerHTML = ""; // Clear existing dots
    slidesData.forEach((_, idx) => {
      const dot = document.createElement("span");
      dot.className = "slider-dot" + (idx === currentSlide ? " active" : "");
      dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
      dot.addEventListener("click", () => showSlide(idx));
      dotsContainer.appendChild(dot);
    });
  }

  function showSlide(index) {
    const totalSlides = slidesData.length;
    if (index >= totalSlides) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = totalSlides - 1;
    } else {
      currentSlide = index;
    }

    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
  }

  function startAutoSlide() {
    // Clear any existing interval to prevent multiple intervals running
    clearInterval(slideInterval);
    slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
  }

  // Event listeners for navigation buttons
  prevBtn.addEventListener("click", () => {
    showSlide(currentSlide - 1);
    startAutoSlide(); // Reset auto-slide timer on manual navigation
  });
  nextBtn.addEventListener("click", () => {
    showSlide(currentSlide + 1);
    startAutoSlide(); // Reset auto-slide timer on manual navigation
  });

  // Initialize the slider
  createSlides();
});
