const expect = require('expect');
const request = require('supertest');

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

describe('Users class', () => {
    it("should remove user's course number", done => {
        users.addUser(user1);
        users.addUser(user2);
        users.addUser(user3);

        users.removeCourse('123123', 'A123');

        expect(users[0].course_numbers.includes('A123')).toBe(false);
        done();
    });
});
