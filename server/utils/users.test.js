const expect = require('expect');

const {Users} = require('./users');



describe('Users', () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    },{
      id: '2',
      name: 'Jen',
      room: 'React Course'
    },{
      id: '3',
      name: 'Ben',
      room: 'Node Course'
    }]
  });

  it('Should add new user', () => {
    let users = new Users();
    let user= {
      id: '1234',
      name: 'Andrew',
      room: 'The office fans'
    }

    let resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('Should return names for node course', () => {
    let userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Mike', 'Ben']);
  });

  it('Should return names for react course', () => {
    let userList = users.getUserList('React Course');

    expect(userList).toEqual(['Jen']);
  });

  it('Should remove a user', () => {
    //passing valid data
    let user = users.removeUser('2');

    expect(user.id).toBe('2');
    expect(users.users.length).toBe(2)
  });

  it('Should not remove user', () => {
    //passing invalid data
    let user = users.removeUser('5');

    expect(user).toNotExist();
    expect(users.users.length).toBe(3)
  });

  it('Should find user', () => {
    //valid id
    let user = users.getUser('1');

    expect(user.id).toBe('1');
  });

  it('Should not find user', () => {
    //invalid id
    let user = users.getUser('5');

    expect(user).toNotExist();
  });
});
