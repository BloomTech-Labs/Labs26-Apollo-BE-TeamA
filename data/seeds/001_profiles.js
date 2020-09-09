const faker = require('faker');

const users = [...new Array(5)].map((i, idx) => ({
  id: idx === 0 ? '00ulthapbErVUwVJy4x6' : faker.random.alphaNumeric(20),
  firstname: idx === 0 ? 'FirstName001': `${faker.name.firstName()}`,
  lastname: idx === 0 ? 'LastName001': `${faker.name.lastName()}`,
  avatarUrl: faker.image.avatar(),
  email: idx === 0 ? 'llama001@maildrop.cc"' : faker.internet.email(),
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(users);
    });
};
