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

async function getAllTopicsbyUser(id) {
  const user = await (
      db('users')
      .select('id', 'firstname', 'lastname')
      .where('id', id)
  )
  userDetail = {
      ...user,
      topics: await db('topics')
      .select('id', 'topicname', 'topicfrequency', 'contextid', 'joincode')
      .where('leaderid', id),
      responses: await db('responses')
      .select('id', 'topicid', 'question_id', 'responses')
      .where('respondedby', id),
      notifications: await db('notifications')
      .select('id', 'notification', 'topicid')
      .where('sentto', id),
      threads: await db('threads')
      .select('id', 'responseid', 'replies')
      .where('repliedby', 'id')
  }
  return userDetail
}


module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
  findOrCreateUser,
  getAllTopicsbyUser
};
