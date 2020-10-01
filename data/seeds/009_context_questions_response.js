
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('context_questions_response').del()
    .then(function () {
      // Inserts seed entries
      return knex('context_questions_response').insert([
        {surveyrequestid: 1, contextquestionid: 1, response: 'Apollo'},
        {surveyrequestid: 1, contextquestionid: 2, response: 'No'},
        {surveyrequestid: 1, contextquestionid: 3, response: 'Nothing'}
      ]);
    });
};
