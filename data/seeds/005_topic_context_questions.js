
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('topic_context_questions').del()
    .then(function () {
      // Inserts seed entries
      return knex('topic_context_questions').insert([
        {topicid: 1, contextquestionid: 1},
        {topicid: 1, contextquestionid: 2},
        {topicid: 1, contextquestionid: 3}
      ]);
    });
};
