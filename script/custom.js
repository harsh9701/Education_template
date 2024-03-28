const slider = document.querySelector('.slider');
let count = 0;

function nextSlide() {
  count++;
  if (count >= slider.children.length) {
    count = 0;
  }
  slider.style.transform = `translateX(-${count * 100}%)`;
}

setInterval(nextSlide, 3000); // Change slide every 3 seconds
