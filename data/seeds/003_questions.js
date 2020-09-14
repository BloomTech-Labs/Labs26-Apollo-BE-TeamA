
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('questions').del()
    .then(function () {
      // Inserts seed entries
      return knex('questions').insert([
        {id: 1, contextid: 1, type: 'Context Questions', style: 'Text', question: 'What is your current priority?'},
        {id: 2, contextid: 2, type: 'Context Questions', style: 'Text', question: 'What is your current priority?'},
        {id: 3, contextid: 3, type: 'Context Questions', style: 'Text', question: 'What is your current priority?'},
        {id: 4, contextid: 4, type: 'Context Questions', style: 'Text', question: 'What is your current priority?'},
        {id: 5, contextid: 5, type: 'Context Questions', style: 'Text', question: 'What is your current priority?'},
        {id: 6, contextid: 1, type: 'Context Questions', style: 'Text', question: 'Do you have any key learnings to share with the team from stakeholders or customers?'},
        {id: 7, contextid: 2, type: 'Context Questions', style: 'Text', question: 'Do you have any key learnings to share with the team from stakeholders or customers?'},
        {id: 8, contextid: 3, type: 'Context Questions', style: 'Text', question: 'Do you have any key learnings to share with the team from stakeholders or customers?'},
        {id: 9, contextid: 4, type: 'Context Questions', style: 'Text', question: 'Do you have any key learnings to share with the team from stakeholders or customers?'},
        {id: 10, contextid: 5, type: 'Context Questions', style: 'Text', question: 'Do you have any key learnings to share with the team from stakeholders or customers?'},
        {id: 11, contextid: 1, type: 'Context Questions', style: 'Text', question: 'What upcoming demos or events should the team be aware of?'},
        {id: 12, contextid: 2, type: 'Context Questions', style: 'Text', question: 'What upcoming demos or events should the team be aware of?'},
        {id: 13, contextid: 3, type: 'Context Questions', style: 'Text', question: 'What upcoming demos or events should the team be aware of?'},
        {id: 14, contextid: 4, type: 'Context Questions', style: 'Text', question: 'What upcoming demos or events should the team be aware of?'},
        {id: 15, contextid: 5, type: 'Context Questions', style: 'Text', question: 'What upcoming demos or events should the team be aware of?'},
        {id: 16, contextid: 1, type: 'Request Questions', style: 'Text', question: 'What did you accomplish yesterday?'},
        {id: 17, contextid: 2, type: 'Request Questions', style: 'Text', question: 'What did you accomplish yesterday?'},
        {id: 18, contextid: 3, type: 'Request Questions', style: 'Text', question: 'What did you accomplish yesterday?'},
        {id: 19, contextid: 4, type: 'Request Questions', style: 'Text', question: 'What did you accomplish yesterday?'},
        {id: 20, contextid: 5, type: 'Request Questions', style: 'Text', question: 'What did you accomplish yesterday?'},
        {id: 21, contextid: 1, type: 'Request Questions', style: 'Text', question: 'What are you working on today?'},
        {id: 22, contextid: 2, type: 'Request Questions', style: 'Text', question: 'What are you working on today?'},
        {id: 23, contextid: 3, type: 'Request Questions', style: 'Text', question: 'What are you working on today?'},
        {id: 24, contextid: 4, type: 'Request Questions', style: 'Text', question: 'What are you working on today?'},
        {id: 25, contextid: 5, type: 'Request Questions', style: 'Text', question: 'What are you working on today?'},
        {id: 26, contextid: 1, type: 'Request Questions', style: 'Text', question: 'Are there any monsters in your path?'},
        {id: 27, contextid: 2, type: 'Request Questions', style: 'Text', question: 'Are there any monsters in your path?'},
        {id: 28, contextid: 3, type: 'Request Questions', style: 'Text', question: 'Are there any monsters in your path?'},
        {id: 29, contextid: 4, type: 'Request Questions', style: 'Text', question: 'Are there any monsters in your path?'},
        {id: 30, contextid: 5, type: 'Request Questions', style: 'Text', question: 'Are there any monsters in your path?'},
        {id: 31, contextid: 1, type: 'Request Questions', style: 'Text', question: 'What is your favorite dessert?'},
        {id: 32, contextid: 2, type: 'Request Questions', style: 'Text', question: 'What is your favorite dessert?'},
        {id: 33, contextid: 3, type: 'Request Questions', style: 'Text', question: 'What is your favorite dessert?'},
        {id: 34, contextid: 4, type: 'Request Questions', style: 'Text', question: 'What is your favorite dessert?'},
        {id: 35, contextid: 5, type: 'Request Questions', style: 'Text', question: 'What is your favorite dessert?'},
      ]);
    });
};
