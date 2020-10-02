
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('survey_requests').del()
    .then(function () {
      // Inserts seed entries
      return knex('survey_requests').insert([
        {id: 1, topicid: 1},
        {id: 2, topicid: 1},
        {id: 3, topicid: 1}
      ]);
    });
};
