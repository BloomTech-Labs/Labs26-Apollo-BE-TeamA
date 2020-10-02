const db = require('../../data/db-config');

const findAll = async () => {
  return await db('context_questions_response');
};

const findBy = (filter) => {
  return db('context_questions_response').where(filter);
};

const findById = async (id) => {
  return db('context_questions_response').where({surveyrequestid: id }).first().select('*');
};

const create = async (response) => {
  return db('context_questions_response').insert(response).returning('*');
};

const update = (id, response) => {
  console.log(response);
  return db('context_questions_response')
    .where({ surveyrequestid: id })
    .first()
    .update(response)
    .returning('*');
};

const remove = async (id) => {
  return await db('context_questions_response').where({ surveyrequestid: id }).del();
};


module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove
};
