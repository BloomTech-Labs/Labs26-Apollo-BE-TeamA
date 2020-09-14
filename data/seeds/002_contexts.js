
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('contexts').del()
    .then(function () {
      // Inserts seed entries
      return knex('contexts').insert([
        {id: 1, contextoption: 'Product Leadership'},
        {id: 2, contextoption: 'Delivery Management'},
        {id: 3, contextoption: 'Project Management'},
        {id: 4, contextoption: 'Design Leadership'},
        {id: 5, contextoption: 'Engineering Leadership'}
      ]);
    });
};
