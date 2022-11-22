const axios = require('axios').default;
export default class SearchFriends {
  constructor() {
    this.arrayOfFriends = [];
    this.sortedArray = [];
  }
  async fetchFriends() {
    try {
      const response = await axios.get('https://randomuser.me/api/?results=20');
      this.arrayOfFriends = response.data.results;
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
    this.sortedArray = this.arrayOfFriends.filter(
      friend =>
        friend.name.first.toLowerCase().includes(letter) ||
        friend.name.last.toLowerCase().includes(letter)
    );

    return letter ? this.sortedArray : this.arrayOfFriends;
  }
  sortFriendsByGender(gender, flag = false) {
    console.log(flag);
    if (flag && gender !== 'All') {
      return this.sortedArray.filter(friend => friend.gender === gender);
    } else if (flag && gender === 'All') {
      console.log('this is second if');
      return this.sortedArray;
    } else if (!flag && gender !== 'All') {
      console.log('this is third if');
      return this.arrayOfFriends.filter(friend => friend.gender === gender);
    } else if (!flag && gender === 'All') {
      console.log('this is fourth if');
      return this.arrayOfFriends;
    }
  }
  sortFriendsByAge(par, flag) {
    console.log(flag);

    if (flag && par === 'asc') {
      return [...this.sortedArray].sort((a, b) => a.dob.age - b.dob.age);
    } else if (flag && par === 'desc') {
      return [...this.sortedArray].sort((a, b) => b.dob.age - a.dob.age);
    } else if (!flag && par === 'asc') {
      console.log('this is third if');
      return [...this.arrayOfFriends].sort((a, b) => a.dob.age - b.dob.age);
    } else if (!flag && par === 'desc') {
      console.log('this is fourth if');
      return [...this.arrayOfFriends].sort((a, b) => b.dob.age - a.dob.age);
    }
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
