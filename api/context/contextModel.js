const db = require('../../data/db-config');

const findAll = async () => {
  return await db('contexts');
};

const findBy = (filter) => {
  return db('contexts').where(filter);
};

const findById = async (id) => {
  return db('contexts').where({ id }).first().select('*');
};

const create = async (context) => {
  return db('contexts').insert(context).returning('*');
};

const update = (id, context) => {
  console.log(context);
  return db('contexts')
    .where({ id: id })
    .first()
    .update(context)
    .returning('*');
};

const remove = async (id) => {
  return await db('contexts').where({ id }).del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
};
