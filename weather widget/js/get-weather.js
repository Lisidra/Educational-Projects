const apiId = '02f63cdb5b27a3d3e7ce698be1f9c1b4';
const iconSize = 100;
const lang = 'Ru';
const units = 'metric';
const cityID = '498817'

// шаблонизатор обращений к элементам DOM
const toElem = (field) => document.querySelector(field);

fetch(`http://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${apiId}&units=${units}&lang=${lang}`)
  .then((resp) => {
    return resp.json() // data to JSON
  })
  .then((data) => {
    console.log(data)
    document.title = `Погода - ${data.name}`
    toElem('.city-name').textContent = data.name;
    toElem('.temperature span').innerHTML = Math.round(data.main.temp) + '&#8451;';

    // weather icon
    let icon = new Image(160, 160);
    icon.src = `http://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png`;
    icon.width = iconSize;
    icon.height = iconSize;
    toElem('.weather-icon').appendChild(icon);

    toElem('.condition').textContent = data.weather[0]['description'];
    toElem('.feels-like').innerHTML = `Ощущается как: ${Math.round(data.main.feels_like)}&#8451;`
    toElem('.wind-speed span').textContent = data.wind.speed + 'м/с';
    toElem('.atmospheric-pressure span').textContent = data.main.pressure + ' мм рт.ст.'
    toElem('.air-humidity span').textContent = data.main.humidity + '%'
  })