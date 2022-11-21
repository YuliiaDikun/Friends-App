import SearchFriends from './fetchFriends';

const startBtn = document.querySelector('.start-btn');
const form = document.querySelector('.form-js');
const divFriends = document.querySelector('.friends-container');

const searchFriensd = new SearchFriends();

startBtn.addEventListener('click', onStartBtn);
form.addEventListener('input', onFormChange);

function onStartBtn() {
  form.classList.remove('is-hidden');
  startBtn.classList.add('is-hidden');
  searchFriensd
    .fetchFriends()
    .then(data => {
      createMarkUp(searchFriensd.friends);
    })
    .catch(error => console.log(error));
}

function onFormChange(e) {
  const {
    elements: { query, gender, age, name },
  } = e.currentTarget;

  if (query.value) {
    createMarkUp(searchFriensd.findFriend(query.value));
  } else if (!query.value) {
    createMarkUp(searchFriensd.friends);
  }

  if (gender.value) {
    createMarkUp(searchFriensd.sortFriendsByGender(gender.value));
  }
  if (gender.value === 'All') {
    createMarkUp(searchFriensd.friends);
  }

  if (age.value) {
    createMarkUp(searchFriensd.sortFriendsByAge(age.value));
  }
  if (name.value) {
    createMarkUp(searchFriensd.sortFriendsByName(name.value));
  }
}

function createMarkUp(arrOfFriends) {
  const markup = arrOfFriends
    .map(friend => {
      return `<div class="friend">
        <img src="${friend.picture.large}" alt="" class="friend-img" width="200" />
        <h2 class="friend-name">${friend.name.first} ${friend.name.last}</h2>
        <h3 class="friend-age">Age: ${friend.dob.age}</h3>
        <p class="friend-gender">Gender: ${friend.gender}</p>
        <p class="friend-email">Email:${friend.email}</p>
      </div>`;
    })
    .join('');
  divFriends.innerHTML = markup;
}
