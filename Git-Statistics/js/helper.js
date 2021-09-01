// template engine for accessing DOM elements
const toElem = (field) => document.querySelector(field);

// returns the form to its original state
const defaultState = () => {
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
  searchInput.focus();
  searchBtn.hidden = false;
}

// controls the hiding/showing of an element on the page
const visibleElement = (elem, status) => {
  let getStatus = (status) ? 'block' : 'none';
  toElem(elem).style.display = getStatus;
}

