
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('notifications').del()
    .then(function () {
      // Inserts seed entries
      return knex('notifications').insert([
        {id: 1, sentto: '00ulthapbErVUwVJy4x6', topicid: '1', notification: 'First notification for your topic.'}      ]);
    });
};
