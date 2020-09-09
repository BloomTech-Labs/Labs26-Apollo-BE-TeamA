const db = require('../../data/db-config');

const findAll = async () => {
  return await db('threads');
};

const findBy = (filter) => {
  return db('threads').where(filter);
};

const findById = async (id) => {
  return db('threads').where({ id }).first().select('*');
};

const create = async (threads) => {
  return db('threads').insert(threads).returning('*');
};

const update = (id, threads) => {
  console.log(threads);
  return db('threads')
    .where({ id: id })
    .first()
    .update(threads)
    .returning('*');
};

const remove = async (id) => {
  return await db('threads').where({ id }).del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
};
