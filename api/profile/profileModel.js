const db = require('../../data/db-config');

const findAll = async () => {
  return await db('users');
};

const findBy = (filter) => {
  return db('users').where(filter);
};

const findById = async (id) => {
  return db('users').where({ id }).first().select('*');
};

const create = async (user) => {
  return db('users').insert(user).returning('*');
};

const update = (id, user) => {
  console.log(user);
  return db('users')
    .where({ id: id })
    .first()
    .update(user)
    .returning('*');
};

const remove = async (id) => {
  return await db('users').where({ id }).del();
};

const findOrCreateUser = async (UserObj) => {
  const foundUser = await findById(UserObj.id).then((User) => User);
  if (foundUser) {
    return foundUser;
  } else {
    return await create(UserObj).then((newUser) => {
      return newUser ? newUser[0] : newUser;
    });
  }
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
  findOrCreateUser,
};
