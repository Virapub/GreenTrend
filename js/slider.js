window.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const slidesData = [
    { src: "images/slide1.jpg", title: "Slide 1", text: "Green Trend" },
    { src: "images/slide2.jpg", title: "Slide 2", text: "Green Trend" },
    { src: "images/slide3.jpg", title: "Slide 3", text: "Green Trend" }
  ];

  // Dynamically create slides
  slidesData.forEach(slide => {
    const slideDiv = document.createElement("div");
    slideDiv.classList.add("slide");
    slideDiv.innerHTML = `
      <img src="${slide.src}" alt="${slide.title}">
      <div class="slide-content">
        <h3>${slide.title}</h3>
        <p>${slide.text}</p>
        <a href="#" class="slide-btn">Shop Now</a>
      </div>
    `;
    slider.appendChild(slideDiv);
  });

  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  function goToSlide(index) {
    const sliderContainer = document.querySelector('.slider');
    const offset = -index * 100;
    sliderContainer.style.transform = `translateX(${offset}%)`;
  }

  // Initialize with the first slide
  goToSlide(currentSlide);

  // Auto-slide every 5 seconds
  setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
  }, 5000);
});
