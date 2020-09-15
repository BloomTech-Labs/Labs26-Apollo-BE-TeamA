
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('topics').del()
    .then(function () {
      // Inserts seed entries
      return knex('topics').insert([
        {id: 1, leaderid: '00ulthapbErVUwVJy4x6', topicname: 'Testing First Topic', topicfrequency: 'Daily', contextid: 1, joincode: '12SZXY'},
        {id: 2, leaderid: '00ulthapbErVUwVJy4x6', topicname: 'Testing Second Topic', topicfrequency: 'Off', contextid: 2, joincode: 'SZ456XY'}

      ]);
    });
};
