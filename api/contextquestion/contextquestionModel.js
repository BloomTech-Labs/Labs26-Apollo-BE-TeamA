const db = require('../../data/db-config');

const findAll = async () => {
  return await db('contextquestions');
};

const findBy = (filter) => {
  return db('contextquestions').where(filter);
};

const findById = async (id) => {
  return db('contextquestions').where({ id }).first().select('*');
};

const create = async (question) => {
  return db('contextquestions').insert(question).returning('*');
};

const update = (id, question) => {
  console.log(question);
  return db('contextquestions')
    .where({ id: id })
    .first()
    .update(question)
    .returning('*');
};

const remove = async (id) => {
  return await db('contextquestions').where({ id }).del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
};
