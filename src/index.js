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
  e.preventDefault();
  const {
    elements: { query, gender, age, name, reset },
  } = e.currentTarget;

  let userLetter = query.value.trim().toLowerCase();
  let userGender = gender.value;
  let userAge = age.value;
  let userName = name.value;

  createMarkUp(searchFriensd.findFriend(userLetter));

  if (userGender) {
    console.log(searchFriensd);
    createMarkUp(searchFriensd.sortFriendsByGender(userGender, !!userLetter));
  }
  console.log(searchFriensd);
  if (userAge) {
    console.log(searchFriensd);
    createMarkUp(
      searchFriensd.sortFriendsByAge(userAge, !!userLetter || !!userGender)
    );
  }
  if (userName) {
    console.log(searchFriensd);
    createMarkUp(searchFriensd.sortFriendsByName(name.value));
  }
}

function createMarkUp(arrOfFriends) {
  const markup = arrOfFriends
    .map(friend => {
      return `<li class="friend">
        <img src="${friend.picture.large}" alt="" class="friend-img" width="200" />
        <h2 class="friend-name">${friend.name.first} ${friend.name.last}</h2>
        <h3 class="friend-age">Age: ${friend.dob.age}</h3>
        <p class="friend-gender">Gender: ${friend.gender}</p>
        <p class="friend-email">Email:${friend.email}</p>
      </li>`;
    })
    .join('');
  divFriends.innerHTML = markup;
}
