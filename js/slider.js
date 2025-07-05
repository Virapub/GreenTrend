window.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider");
  const prevBtn = document.querySelector(".prev-slide");
  const nextBtn = document.querySelector(".next-slide");
  const dotsContainer = document.querySelector(".slider-dots");
  
  // Slide data
  const slides = [
    { 
      src: "images/slide4.jpg", 
      title: "Premium Quality", 
      text: "Discover our eco-friendly products",
      link: "products.html"
    },
    { 
      src: "images/slide5.jpg", 
      title: "Summer Collection", 
      text: "New arrivals for the sunny season",
      link: "summer-collection.html"
    },
    { 
      src: "images/slide6.jpg", 
      title: "Special Offers", 
      text: "Limited time discounts on selected items",
      link: "offers.html"
    }
  ];

  let currentSlide = 0;
  let slideInterval;
  const slideDuration = 5000; // 5 seconds

  // Initialize the slider
  function initSlider() {
    if (!slider) {
      console.error("Slider container not found!");
      return;
    }

    createSlides();
    createDots();
    showSlide(currentSlide);
    startAutoSlide();
    setupEventListeners();
  }

  // Create slide elements
  function createSlides() {
    slider.innerHTML = slides.map((slide, index) => `
      <div class="slide" data-index="${index}">
        <img src="${slide.src}" alt="${slide.title}" loading="lazy">
        <div class="slide-content">
          <h3>${slide.title}</h3>
          <p>${slide.text}</p>
          <a href="${slide.link}" class="slide-btn">Shop Now</a>
        </div>
      </div>
    `).join("");
  }

  // Create navigation dots
  function createDots() {
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = slides.map((_, index) => `
      <span class="slider-dot" data-index="${index}"></span>
    `).join("");
    
    updateDots();
  }

  // Update active dot
  function updateDots() {
    if (!dotsContainer) return;
    
    const dots = dotsContainer.querySelectorAll(".slider-dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  // Show specific slide
  function showSlide(index) {
    const totalSlides = slides.length;
    
    // Handle slide boundaries
    if (index >= totalSlides) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = totalSlides - 1;
    } else {
      currentSlide = index;
    }
    
    // Update slider position
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    updateDots();
    
    // Reset auto-slide timer
    resetAutoSlide();
  }

  // Start auto-sliding
  function startAutoSlide() {
    slideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, slideDuration);
  }

  // Reset auto-slide timer
  function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  // Set up event listeners
  function setupEventListeners() {
    // Navigation buttons
    if (prevBtn) {
      prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
    }
    
    if (nextBtn) {
      nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
    }
    
    // Dot navigation
    if (dotsContainer) {
      dotsContainer.addEventListener("click", (e) => {
        const dot = e.target.closest(".slider-dot");
        if (dot) {
          const index = parseInt(dot.dataset.index);
          showSlide(index);
        }
      });
    }
    
    // Pause on hover
    slider.addEventListener("mouseenter", () => clearInterval(slideInterval));
    slider.addEventListener("mouseleave", startAutoSlide);
    
    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        showSlide(currentSlide - 1);
      } else if (e.key === "ArrowRight") {
        showSlide(currentSlide + 1);
      }
    });
    
    // Handle window resize
    window.addEventListener("resize", () => {
      slider.style.transition = "none";
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;
      setTimeout(() => {
        slider.style.transition = "transform 0.5s ease-in-out";
      }, 10);
    });
  }

  // Initialize the slider
  initSlider();
});
