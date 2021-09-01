const searchInput = toElem('.input-search');
const searchBtn = toElem('.bt-search');
const defaultPhoto = 'images/default_photo.svg';
const defaultSimbol = '***'
let count = 0; // commits counter

// init()
defaultState();

// event tracking
searchBtn.addEventListener('click', () => start());
searchInput.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) start()
});

// start >>>
const start = () => {
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
}

// change User - Button
toElem('.change-user').addEventListener('click', () => defaultState())

// main >>>
const getInfo = (userName) => {
  fetch(`https://api.github.com/users/${userName}`)
    .then(resp => resp.json())
    .then(data => {
      if (data.message) {
        console.log("The user was not found");
        defaultState()
        // todo - message 404
      }
      else {
        if (data.name || data.login) {
          visibleElement('.userName-block', true);
          toElem('.user-name').textContent = (data.name) ? data.name : data.login;
          document.title = `Git-Info - ${data.login}`
        } // user name or nickname

        if (data.email) {
          visibleElement('.user-email', true);
          toElem('.user-email').textContent = data.email;
        } // Email

        if (data.location) {
          visibleElement('.user-location', true);
          toElem('.user-location').textContent = data.location;
        } // location

        if (data.avatar_url) toElem('.profile-photo').src = data.avatar_url; // avatar

        toElem('.repositories .quantity').textContent = data.public_repos; // number of public repositories
        toElem('.followers .quantity').textContent = data.followers; // number of subscribers
        getRepos(userName); // returns the number of commits in the repositories to the page
      }
    })
  count = 0;
}

const getRepos = (userName) => {
  fetch(`https://api.github.com/users/${userName}/repos`)
    .then(resp => resp.json())
    .then(data => linksToArr(data)) // returns links to repositories
    .then(links => countCommits(links)) // 
}

const linksToArr = (data) => {
  let links = [];
  data.forEach(item => links.push(item.commits_url.slice(0, -6)))
  return links;
} // returns an array with links to repositories

const countCommits = (data) => {
  for (item of data) {
    requestByLink(item)
    console.log(item) // returns links to repositories in console.log
  }
} // todo

const requestByLink = (link) => {
  fetch(link)
    .then(commits => commits.json())
    .then(commits => {
      for (value in commits) count++;
      console.log(`${value} => ${count}`);
      toElem('.commits .quantity').textContent = count;
    })
} // todo