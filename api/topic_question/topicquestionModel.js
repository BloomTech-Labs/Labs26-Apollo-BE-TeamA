const db = require('../../data/db-config');

const findAll = async () => {
  return await db('topic_questions');
};

const findBy = (filter) => {
  return db('topic_questions').where(filter);
};

const findById = async (id) => {
  return db('topic_questions').where({ id }).first().select('*');
};

const create = async (threads) => {
  return db('topic_questions').insert(threads).returning('*');
};

const update = (id, threads) => {
  console.log(threads);
  return db('topic_questions')
    .where({ id: id })
    .first()
    .update(threads)
    .returning('*');
};

const remove = async (id) => {
  return await db('topic_questions').where({ id }).del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
};
