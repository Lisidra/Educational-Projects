fetch('http://api.openweathermap.org/data/2.5/weather?id=498817&appid=02f63cdb5b27a3d3e7ce698be1f9c1b4&units=metric&lang=Ru')
  .then((resp) => {
    return resp.json() // Конвертируем data в json
  })
  .then((data) => {
    console.log(data)
    document.title = `Погода - ${data.name}`
    document.querySelector('.city-name').textContent = data.name;
    document.querySelector('.temperature span').innerHTML = Math.round(data.main.temp) + '&#8451;';

    // weather icon
    let icon = new Image(160, 160);
    icon.src = `http://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png`;
    icon.width = 100;
    icon.height = 100;
    document.querySelector('.weather-icon').appendChild(icon);

    document.querySelector('.condition').textContent = data.weather[0]['description'];
    document.querySelector('.feels-like').innerHTML = `Ощущается как: ${Math.round(data.main.feels_like)}&#8451;`
    document.querySelector('.wind-speed span').textContent = `${data.wind.speed} м/с`;
  })
  .catch(() => {
    // ошибки
  })