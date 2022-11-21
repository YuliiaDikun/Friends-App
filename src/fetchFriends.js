const axios = require('axios').default;
export default class SearchFriends {
  constructor() {
    this.arrayOfFriends = [];
  }
  async fetchFriends() {
    try {
      const response = await axios.get('https://randomuser.me/api/?results=20');
      this.arrayOfFriends = response.data.results;
      console.log(this);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
  get friends() {
    return this.arrayOfFriends;
  }
  set friends(newFriends) {
    return this.arrayOfFriends.push(newFriends);
  }
  findFriend(letter) {
    return this.arrayOfFriends.filter(
      friend =>
        friend.name.first.includes(letter) || friend.name.last.includes(letter)
    );
  }
  sortFriendsByGender(gender) {
    return this.arrayOfFriends.filter(friend => friend.gender === gender);
  }
  sortFriendsByAge(par) {
    let sortedFriends = [];
    if (par === 'asc') {
      sortedFriends = [...this.arrayOfFriends].sort(
        (a, b) => a.dob.age - b.dob.age
      );
    } else if (par === 'desc') {
      sortedFriends = [...this.arrayOfFriends].sort(
        (a, b) => b.dob.age - a.dob.age
      );
    } else {
      return this.arrayOfFriends;
    }
    return sortedFriends;
  }
  sortFriendsByName(par) {
    let sortedFriends = [];
    if (par === 'asc') {
      sortedFriends = [...this.arrayOfFriends].sort((a, b) =>
        a.name.first.localeCompare(b.name.first)
      );
    } else if (par === 'desc') {
      sortedFriends = [...this.arrayOfFriends].sort((a, b) =>
        b.name.first.localeCompare(a.name.first)
      );
    } else {
      return this.arrayOfFriends;
    }
    return sortedFriends;
  }
}
