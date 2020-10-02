
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('requestquestions').del()
    .then(function () {
      // Inserts seed entries
      return knex('requestquestions').insert([
        {id: 1, style: 'Text', question: 'What are you working on today?', default: 'True'},
        {id: 2, style: 'Text', question: 'Are there any monsters in your path?', default: 'True'},
        {id: 3, style: 'Text', question: 'What is your favorite dessert?', default: 'True'},
      ]);
    });
};
