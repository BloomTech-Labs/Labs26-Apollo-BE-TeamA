
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('threads').del()
    .then(function () {
      // Inserts seed entries
      return knex('threads').insert([
        {id: 1, responseid: 1, reply: 'rowValue1', repliedby: '00ulthapbErVUwVJy4x6'},
        {id: 2, responseid: 1, reply: 'rowValue2', repliedby: '00ulthapbErVUwVJy4x6'},
        {id: 3, responseid: 3, reply: 'rowValue3', repliedby: '00ulthapbErVUwVJy4x6'}
      ]);
    });
};
