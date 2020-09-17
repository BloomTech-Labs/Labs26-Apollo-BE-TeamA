
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('threads').del()
    .then(function () {
      // Inserts seed entries
      return knex('threads').insert([
        {id: 1, responseid: 1, reply: 'This reply is for your responsein my topic', repliedby: '00ulthapbErVUwVJy4x6'}
      ]);
    });
};
