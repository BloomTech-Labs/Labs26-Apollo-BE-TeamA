const db = require('../../data/db-config');

const findAll = async () => {
  return await db('survey_requests');
};

const findBy = (filter) => {
  return db('survey_requests').where(filter);
};

const findById = async (id) => {
  return db('survey_requests').where({ id }).first().select('*');
};

const create = async (question) => {
  return db('survey_requests').insert(question).returning('*');
};

const update = (id, question) => {
  console.log(question);
  return db('survey_requests')
    .where({ id: id })
    .first()
    .update(question)
    .returning('*');
};

const remove = async (id) => {
  return await db('survey_requests').where({ id }).del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
};
