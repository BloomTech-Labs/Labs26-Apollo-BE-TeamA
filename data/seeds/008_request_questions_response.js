
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('request_questions_response').del()
    .then(function () {
      // Inserts seed entries
      return knex('request_questions_response').insert([
        {id: 1, surveyrequestid: 1, requestquestionid: 1, response: 'Backend', respondedby: '00ulthapbErVUwVJy4x6'},
        {id: 2, surveyrequestid: 1, requestquestionid: 2, response: 'Nothing', respondedby: '00ulthapbErVUwVJy4x6'},
        {id: 3, surveyrequestid: 1, requestquestionid: 3, response: 'Ice-scream', respondedby: '00ulthapbErVUwVJy4x6'}
      ]);
    });
};
