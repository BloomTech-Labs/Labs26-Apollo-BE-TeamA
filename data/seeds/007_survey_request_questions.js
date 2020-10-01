
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('survey_request_questions').del()
    .then(function () {
      // Inserts seed entries
      return knex('survey_request_questions').insert([
        {surveyrequestid: 1, requestquestionid: 1},
        {surveyrequestid: 1, requestquestionid: 2},
        {surveyrequestid: 1, requestquestionid: 3}
      ]);
    });
};
