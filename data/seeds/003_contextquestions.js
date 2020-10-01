
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('contextquestions').del()
    .then(function () {
      // Inserts seed entries
      return knex('contextquestions').insert([
        {id: 1, style: 'Text', question: 'What is your current priority?', default: 'True'},
        {id: 2, style: 'Text', question: 'Do you have any key learnings to share with the team from stakeholders or customers?', default: 'True'},
        {id: 3, style: 'Text', question: 'What upcoming demos or events should the team be aware of?', default: 'True'},
      ]);
    });
};
