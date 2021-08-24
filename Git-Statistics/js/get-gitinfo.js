// шаблонизатор обращений к элементам DOM
const toElem = (field) => document.querySelector(field);

// Управляет скрытие/показом элемента на странице
const visibleElement = (elem, status) => {
  let getStatus = (status) ? 'block' : 'none';
  toElem(elem).style.display = getStatus;
}

const defaultPhoto = 'images/default_photo.svg';
const defaultSimbol = '***'

const searchInput = toElem('.input-search'); // поле поиска
const searchBtn = toElem('.bt-search'); // кнопка поиска
let count = 0; // счётчик коммитов

const defaultState = () => {
  // U+22C8
  // &#8904;
  document.title = `Git-Info`
  toElem('.user-name').textContent = '';
  toElem('.user-email').textContent = '';
  toElem('.user-location').textContent = '';
  toElem('.repositories .quantity').textContent = defaultSimbol;
  toElem('.commits .quantity').textContent = defaultSimbol;
  toElem('.followers .quantity').textContent = defaultSimbol;
  toElem('.profile-photo').src = defaultPhoto;
  visibleElement('.userName-block', false);
  visibleElement('.user-email', false);
  visibleElement('.user-location', false);
  searchInput.hidden = false;
  searchBtn.hidden = false;
}

// init()
defaultState();

// Start >>>
searchBtn.addEventListener('click', () => {
  if (searchInput.value.trim() != '') {
    getInfo(searchInput.value);
    searchInput.hidden = true;
    searchBtn.hidden = true;
  }
  else {
    searchInput.style.borderColor = 'rgb(207, 77, 77)';
    setTimeout(() => searchInput.style.borderColor = 'rgb(33, 38, 45)', 500)
  }
  searchInput.value = ''
})

// Change User - Button
toElem('.change-user').addEventListener('click', () => defaultState())

// main >>>
const getInfo = (userName) => {
  fetch(`https://api.github.com/users/${userName}`)
    .then(resp => resp.json()) // data to JSON
    .then(data => {

      if (data.name || data.login) {
        visibleElement('.userName-block', true);
        toElem('.user-name').textContent = (data.name) ? data.name : data.login;
        document.title = `Git-Info - ${data.login}`
      } // имя пользователя или никнейм

      if (data.email) {
        visibleElement('.user-email', true);
        toElem('.user-email').textContent = data.email;
      } // Email

      if (data.location) {
        visibleElement('.user-location', true);
        toElem('.user-location').textContent = data.location;
      } // Местоположение

      if (data.avatar_url) toElem('.profile-photo').src = data.avatar_url; // аватар

      toElem('.repositories .quantity').textContent = data.public_repos; // количество публичных репозиториев
      toElem('.followers .quantity').textContent = data.followers; // количество подписчиков
      getRepos(userName); // возвращает на страницу количество коммитов в репозиториях
    })
  count = 0; // обнуление счетчика коммитов
}

const getRepos = (userName) => {
  fetch(`https://api.github.com/users/${userName}/repos`)
    .then(resp => resp.json()) // data to JSON
    .then(data => linksToArr(data)) // возвращает ссылки на репозитории
    .then(links => countCommits(links)) // 
}

const linksToArr = (data) => {
  let links = [];
  data.forEach(item => links.push(item.commits_url.slice(0, -6)))
  return links;
} // возвращает массив со ссылками на репозитории

const countCommits = (data) => {
  for (item of data) {
    requestByLink(item)
    console.log(item) // возвращает в console.log ссылки на репозитории
  }
} // todo

const requestByLink = (link) => {
  fetch(link)
    .then(commits => commits.json())
    .then(commits => {
      for (value in commits) count++;
      toElem('.commits .quantity').textContent = count;
    })
} // todo