const day = {
  'background': '#6ec9cc',
  'colorText': 'rgb(255, 255, 255)'
}
const night = {
  'background': '#2e5d5f',
  'colorText': 'rgb(214, 214, 214)'
}

function timeOfDay() {
  let data = new Date();

  if (data.getHours() > 0 && data.getHours() < 6) {
    document.querySelector('.container-widget').style.background = night.background;
    document.querySelector('.container-widget').style.color = night.colorText;
  }
  else {
    document.querySelector('.container-widget').style.background = day.background;
    document.querySelector('.container-widget').style.color = day.colorText;
  }
}

timeOfDay()