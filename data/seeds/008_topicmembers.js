
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('topicmembers').del()
    .then(function () {
      // Inserts seed entries
      return knex('topicmembers').insert([
        {id: 2, topicid: 2, leaderid: '00ulthapbErVUwVJy4x6', memberid: '44beb7vzwvhmsm4c6l0e'},
      ]);
    });
};
