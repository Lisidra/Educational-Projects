const images = document.querySelectorAll('.slider-item');
const sliderLine = document.querySelector('.slider-line');
let count = 0;
let widthSlider;

// adapting to the screen width
function resize() {
  widthSlider = document.querySelector('.slider').offsetWidth;
  sliderLine.style.width = widthSlider * images.length + 'px'
  images.forEach(item => {
    item.style.width = widthSlider + 'px'
    item.style.height = 'auto';
  })

  rollSlider()
}

resize();
window.addEventListener('resize', resize);

// previous slide
document.querySelector('.slider-prev').addEventListener('click', () => {
  count--;
  if (count < 0) {
    count = images.length - 1;
  }
  rollSlider()
})
// next slide
document.querySelector('.slider-next').addEventListener('click', () => {
  count++;
  if (count >= images.length) {
    count = 0;
  }
  rollSlider()
})

// swipe the slider
function rollSlider() {
  sliderLine.style.transform = `translate(-${+count * (widthSlider)}px`;
}