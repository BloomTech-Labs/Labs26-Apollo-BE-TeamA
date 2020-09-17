
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('questions').del()
    .then(function () {
      // Inserts seed entries
      return knex('questions').insert([
        {id: 1, type: 'Context Questions', style: 'Text', question: 'What is your current priority?'},
        {id: 2, type: 'Context Questions', style: 'Text', question: 'Do you have any key learnings to share with the team from stakeholders or customers?'},
        {id: 3, type: 'Context Questions', style: 'Text', question: 'What upcoming demos or events should the team be aware of?'},
        {id: 4, type: 'Request Questions', style: 'Text', question: 'What are you working on today?'},
        {id: 5, type: 'Request Questions', style: 'Text', question: 'Are there any monsters in your path?'},
        {id: 6, type: 'Request Questions', style: 'Text', question: 'What is your favorite dessert?'},
      ]);
    });
};
