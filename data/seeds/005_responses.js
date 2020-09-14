
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('responses').del()
    .then(function () {
      // Inserts seed entries
      return knex('responses').insert([
        {id: 1, questionid: 1, response: 'This is my response.', respondedby: '00ulthapbErVUwVJy4x6', topicid: 1},
      ]);
    });
};
