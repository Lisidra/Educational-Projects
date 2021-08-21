const userName = 'vetlee'
let count = 0;
fetch(`https://api.github.com/users/${userName}`)
  .then(resp => { return resp.json() })
  .then(data => {
    // console.log(data);
    document.querySelector('.profile-photo').src = data.avatar_url; // аватар
    if (data.name == null) {
      document.querySelector('.user-name').textContent = data.login; // имя пользователя, если есть
    }
    else {
      document.querySelector('.user-name').textContent = data.name; // иначе никнейм
    }
    document.title = `GitInfo - ${data.login}` // никнейм в имени вкладки
    document.querySelector('.user-emain').textContent = data.email; // Emain
    document.querySelector('.user-location').textContent = data.location; // Местоположение
    document.querySelector('.repositories .quantity').textContent = data.public_repos; // количество публичных репозиториев
    document.querySelector('.followers .quantity').textContent = data.followers; // количество подписчиков
  })

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

















// fetch(`https://api.github.com/users/${userName}/repos`)
//   // Получаем список репозиториев пользователя
//   .then(resp => { return resp.json() })
//   .then(data => {
//     console.log(data);
//     for (let i = 0; i < data.length; i++) {
//       // Перебираем список, складывая количество коммитов в каждом из них
//       fetch(data[i].commits_url.slice(0, -6))
//         .then(resp => { return resp.json() })
//         .then(data => {
//           // console.log(data.length);
//           countCommits += data.length;
//           console.log('============');
//           console.log(`Коммитов в текущем репозитории: ${data.length}`);
//           console.log(`Счётчик коммитов: ${countCommits}`);
//         })
//     }
//   })

// console.log(countCommits);
// document.querySelector('.commits .quantity').textContent = countCommits;