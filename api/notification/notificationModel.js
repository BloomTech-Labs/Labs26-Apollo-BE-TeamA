const db = require('../../data/db-config');

const findAll = async () => {
  return await db('notifications');
};

const findBy = (filter) => {
  return db('notifications').where(filter);
};

const findById = async (id) => {
  return db('notifications').where({ id }).first().select('*');
};

const create = async (notification) => {
  return db('notifications').insert(notification).returning('*');
};

const update = (id, notification) => {
  console.log(notification);
  return db('notifications')
    .where({ id: id })
    .first()
    .update(notification)
    .returning('*');
};

const remove = async (id) => {
  return await db('notifications').where({ id }).del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
};
