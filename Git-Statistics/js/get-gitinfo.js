// шаблонизатор обращений к элементам DOM
function toElem(field) {
  return document.querySelector(field)
}

const output = (item) => {
  toElem('.commits .quantity').textContent = item;
}

const calc = (item) => {
  for (value in item) {
    count++;
  }
  output(count)
}

const requestByLink = (item) => {
  fetch(item)
    .then(commit => commit.json())
    .then(commit => calc(commit))
}

const linksToArr = (data) => {
  let links = [];
  data.forEach(item => links.push(item.commits_url.slice(0, -6)))
  return links;
}

const viewCommits = (data) => {
  for (let i = 0; i < data.length; i++) {
    requestByLink(data[i])
  }
}

// Task-2
const getRepos = (userName) => {
  fetch(`https://api.github.com/users/${userName}/repos`)
    .then(resp => resp.json()) // data to JSON
    .then(data => linksToArr(data)) // находим ссылки и добавляем в массив
    .then(links => viewCommits(links)) // делаем запросы по ссылкам
}

// Основная функция
const getInfo = (userName) => {
  fetch(`https://api.github.com/users/${userName}`)
    .then(resp => { return resp.json() })
    .then(data => {
      document.title = `GitInfo - ${data.login}`
      toElem('.profile-photo').src = data.avatar_url; // аватар
      toElem('.user-name').textContent = (data.name == null) ? data.login : data.name; // имя пользователя или никнейм
      toElem('.user-emain').textContent = data.email; // Emain
      toElem('.user-location').textContent = data.location; // Местоположение
      toElem('.repositories .quantity').textContent = data.public_repos; // количество публичных репозиториев
      toElem('.followers .quantity').textContent = data.followers; // количество подписчиков
      getRepos(userName); // количество коммитов
    })
}

let count = 0; // счётчик коммитов
getInfo('vetlee')