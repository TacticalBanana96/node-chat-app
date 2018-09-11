// [{
//   id: '/#ddgsf6grhbfsbfkf',
//   name: 'Somebody',
//   room: 'The office fans'
// }]

// addUser(id, name, room)
// removeUser(id)
//getUser(id)
//getUserList(room)

class Users {
  constructor(){
    this.users = [];
  }

  addUser(id, name , room) {
    let user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser(id){
    let user = this.getUser(id);

    if(user){
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }

  getUser(id){
  return this.users.filter((user) => user.id === id)[0];
    //let name = user.map((user) => user.name)
  }

  getUserList(room){
    let users = this.users.filter((user)=>  user.room === room);
    let namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

module.exports = {Users};



















// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s) old`;
//   }
// }
//
// const me = new Person('Andrew', 25);
// const description = me.getUserDescription();
// console.log(description);
