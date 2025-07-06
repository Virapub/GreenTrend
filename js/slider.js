window.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const slides = [
    { src: "images/slide1.jpg", title: "Slide 1", text: "Green Trend" },
    { src: "images/slide2.jpg", title: "Slide 2", text: "Green Trend" },
    { src: "images/slide3.jpg", title: "Slide 3", text: "Green Trend" }
  ];
  let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function goToSlide(index) {
  const slider = document.querySelector('.slider');
  const offset = -index * 100;
  slider.style.transform = `translateX(${offset}%)`;
}

setInterval(() => {
  currentSlide = (currentSlide + 1) % totalSlides;
  goToSlide(currentSlide);
}, 5000); // Changes slide every 5 seconds
