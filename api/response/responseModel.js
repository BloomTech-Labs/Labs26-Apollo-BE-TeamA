const db = require('../../data/db-config');

const findAll = async () => {
  return await db('responses');
};

const findBy = (filter) => {
  return db('responses').where(filter);
};

const findById = async (id) => {
  return db('responses').where({ id }).first().select('*');
};

const create = async (response) => {
  return db('responses').insert(response).returning('*');
};

const update = (id, response) => {
  console.log(response);
  return db('responses')
    .where({ id: id })
    .first()
    .update(response)
    .returning('*');
};

const remove = async (id) => {
  return await db('responses').where({ id }).del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
};
