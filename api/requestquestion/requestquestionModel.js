const db = require('../../data/db-config');

const findAll = async () => {
  return await db('requestquestions');
};

const getDefaultRequestQuestion = async () => {
  return await db('requestquestions').where ( {default: "True"});
};

const findBy = (filter) => {
  return db('requestquestions').where(filter);
};

const findById = async (id) => {
  return db('requestquestions').where({ surveyrequestid: id }).first().select('*');
};

const create = async (question) => {
  return db('requestquestions').insert(question).returning('*');
};

const update = (id, question) => {
  console.log(question);
  return db('requestquestions')
    .where({ surveyrequestid: id })
    .first()
    .update(question)
    .returning('*');
};

const remove = async (id) => {
  return await db('requestquestions').where({ surveyrequestid: id }).del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
  getDefaultRequestQuestion
};
