let data = new Date();
const theme = {
  day: {
    'background': '#6ec9cc',
    'colorText': 'rgb(255, 255, 255)'
  },
  night: {
    'background': '#2e5d5f',
    'colorText': 'rgb(214, 214, 214)'
  }
}

if (data.getHours() > 0 && data.getHours() < 6) {
  designTheme(theme.night)
}
else {
  designTheme(theme.day)
}

function designTheme(theme) {
  document.querySelector('.container-widget').style.background = theme.background;
  document.querySelector('.container-widget').style.color = theme.colorText;
}