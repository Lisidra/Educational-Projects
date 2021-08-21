let count = 0;

function toElem(field) {
  return document.querySelector(field)
}
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
    })
}

getInfo('lisidra');

fetch(`https://api.github.com/users/${userName}/repos`)
  // получаем массив с инфой по всем открытым репозиториям пользователя
  // преобразовываем в json
  .then(resp => { return resp.json() })
  // вытаскиваем ссылки на репозитории и пушим их в массив
  .then(data => {
    let links = [];
    data.forEach(repos => {
      links.push(repos.commits_url.slice(0, -6));
    });
    return links;
  })
  // перебираем массив со ссылками
  .then(links => {
    for (let i = 0; i < links.length; i++) {
      fetch(links[i])
        .then(commits => { return commits.json() })
        .then(commits => {
          console.log(commits); // Выводит в консоль списки коммитов по каждому репозиторию
          for (val in commits) {
            count++;
          }
          return count
        })
        .then(countCommits => {
          document.querySelector('.commits .quantity').textContent = countCommits;
        })
    }
  })