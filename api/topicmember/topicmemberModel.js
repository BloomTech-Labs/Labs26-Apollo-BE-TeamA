const db = require('../../data/db-config');

const findAll = async () => {
  return await db('topicmembers');
};

const findBy = (filter) => {
  return db('topicmembers').where(filter);
};

const findById = async (id) => {
  return db('topicmembers').where({ id }).first().select('*');
};

const create = async (topic) => {
  return db('topicmembers').insert(topic).returning('*');
};

const update = (id, topic) => {
  console.log(topic);
  return db('topicmembers')
    .where({ id: id })
    .first()
    .update(topic)
    .returning('*');
};

const remove = async (id) => {
  return await db('topicmembers').where({ id }).del();
};



module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove
};
