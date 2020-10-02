
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('topic_request_questions').del()
    .then(function () {
      // Inserts seed entries
      return knex('topic_request_questions').insert([
        {topicid: 1, requestquestionid: 1},
        {topicid: 1, requestquestionid: 2},
        {topicid: 1, requestquestionid: 3}
      ]);
    });
};
