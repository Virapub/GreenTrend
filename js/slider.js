window.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const slider = document.querySelector(".slider");
  const prevBtn = document.querySelector(".prev-slide");
  const nextBtn = document.querySelector(".next-slide");
  const dotsContainer = document.querySelector(".slider-dots");
  
  // Slide Data
  const slides = [
    { 
      src: "images/slide1.jpg", 
      title: "Premium Quality", 
      text: "Discover our Multi-functional products",
      link: "products.html"
    },
    { 
      src: "images/slide2.jpg", 
      title: "Unique Gadgets Collection", 
      text: "New arrivals for the sunny season",
      link: "products.html"
    },
    { 
      src: "images/slide3.jpg", 
      title: "Special Offers", 
      text: "Limited time discounts on selected items",
      link: "products.html"
    }
  ];

  // Slider State
  let currentSlide = 0;
  let slideInterval;
  const slideDuration = 5000; // 5 seconds
  let isAutoSliding = true;

  // Initialize Slider
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

  // Create Slide Elements
  function createSlides() {
    slider.innerHTML = slides.map((slide, index) => `
      <div class="slide" data-index="${index}" aria-hidden="${index !== 0}">
        <img src="${slide.src}" alt="${slide.title}" loading="lazy">
        <div class="slide-content">
          <h2>${slide.title}</h2>
          <p>${slide.text}</p>
          <a href="${slide.link}" class="slide-btn" aria-label="Shop ${slide.title}">Shop Now</a>
        </div>
      </div>
    `).join("");
  }

  // Create Navigation Dots
  function createDots() {
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = slides.map((_, index) => `
      <button class="slider-dot" data-index="${index}" aria-label="Go to slide ${index + 1}">
        <span class="sr-only">Slide ${index + 1}</span>
      </button>
    `).join("");
    
    updateDots();
  }

  // Update Active Dot and ARIA Attributes
  function updateDots() {
    if (!dotsContainer) return;
    
    const dots = dotsContainer.querySelectorAll(".slider-dot");
    const slideElements = slider.querySelectorAll(".slide");
    
    dots.forEach((dot, index) => {
      const isActive = index === currentSlide;
      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-current", isActive);
    });
    
    slideElements.forEach((slide, index) => {
      slide.setAttribute("aria-hidden", index !== currentSlide);
    });
  }

  // Show Specific Slide
  function showSlide(index) {
    const totalSlides = slides.length;
    
    // Handle slide boundaries
    currentSlide = (index + totalSlides) % totalSlides;
    
    // Update slider position
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update navigation
    updateDots();
    
    // Reset auto-slide timer
    if (isAutoSliding) {
      resetAutoSlide();
    }
  }

  // Auto-Slide Controls
  function startAutoSlide() {
    isAutoSliding = true;
    slideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, slideDuration);
  }

  function stopAutoSlide() {
    isAutoSliding = false;
    clearInterval(slideInterval);
  }

  function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  // Event Listeners
  function setupEventListeners() {
    // Navigation buttons
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        showSlide(currentSlide - 1);
        stopAutoSlide();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        showSlide(currentSlide + 1);
        stopAutoSlide();
      });
    }
    
    // Dot navigation
    if (dotsContainer) {
      dotsContainer.addEventListener("click", (e) => {
        const dot = e.target.closest(".slider-dot");
        if (dot) {
          const index = parseInt(dot.dataset.index);
          showSlide(index);
          stopAutoSlide();
        }
      });
    }
    
    // Pause on hover/focus
    slider.addEventListener("mouseenter", stopAutoSlide);
    slider.addEventListener("mouseleave", startAutoSlide);
    slider.addEventListener("focusin", stopAutoSlide);
    slider.addEventListener("focusout", startAutoSlide);
    
    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        showSlide(currentSlide - 1);
        stopAutoSlide();
      } else if (e.key === "ArrowRight") {
        showSlide(currentSlide + 1);
        stopAutoSlide();
      }
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      slider.style.transition = "none";
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;
      resizeTimeout = setTimeout(() => {
        slider.style.transition = "transform 0.5s ease-in-out";
      }, 100);
    });
  }

  // Initialize the slider
  initSlider();
});
