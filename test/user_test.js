const { Users } = require('./../users');

const users = new Users();

const user1 = {
    token: '123123',
    major: 'ABC',
    course_number: 'A123'
};

const user3 = {
    token: '123123',
    major: 'AB',
    course_number: 'A1234'
};

const user2 = {
    token: '123456',
    major: 'AB',
    course_number: 'AB34'
};

users.addUser(user1);
users.addUser(user2);
users.addUser(user3);

console.log(users.getUserList());

users.removeCourse(user1.token, user1.course_number);

console.log('after');
console.log(users.getUserList());

console.log('get User');
console.log(users.getUser(user1.token));