const db = require('../../data/db-config');

const findAll = async () => {
  return await db('questions');
};

const findBy = (filter) => {
  return db('questions').where(filter);
};

const findById = async (id) => {
  return db('questions').where({ id }).first().select('*');
};

const create = async (question) => {
  return db('questions').insert(question).returning('*');
};

const update = (id, question) => {
  console.log(question);
  return db('questions')
    .where({ id: id })
    .first()
    .update(question)
    .returning('*');
};

const remove = async (id) => {
  return await db('questions').where({ id }).del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
};
