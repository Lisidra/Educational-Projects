const sliderLine = document.querySelector('.slider-line');
const quantityItems = document.querySelectorAll('.slider-item').length // количество картинок в слайдере
let offset = 0; // смещение от левого края

document.querySelector('#slider-prev').addEventListener('click', () => {
  offset -= 256;
  if (offset < 0) {
    offset = 256 * (quantityItems - 1);
  }
  sliderLine.style.left = -offset + 'px'
}) // button prev

document.querySelector('#slider-next').addEventListener('click', () => {
  offset += 256;
  if (offset > (256 * (quantityItems - 1))) {
    offset = 0
  }
  sliderLine.style.left = -offset + 'px'
}) // button next