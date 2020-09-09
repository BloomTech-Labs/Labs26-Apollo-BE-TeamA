const db = require('../../data/db-config');

const findAll = async () => {
  return await db('topics');
};

const findBy = (filter) => {
  return db('topics').where(filter);
};

const findById = async (id) => {
  return db('topics').where({ id }).first().select('*');
};

const create = async (topic) => {
  return db('topics').insert(topic).returning('*');
};

const update = (id, topic) => {
  console.log(topic);
  return db('topics')
    .where({ id: id })
    .first()
    .update(topic)
    .returning('*');
};

const remove = async (id) => {
  return await db('topics').where({ id }).del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
};
