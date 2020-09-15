const db = require('../../data/db-config');

const findAll = async () => {
  return await db('topics');
};

const findBy = (filter) => {
  return db('topics').where(filter);
};

const findById = async (id) => {
  return db('topics').where({ id }).first().select('*');
};

const create = async (topic) => {
  return db('topics').insert(topic).returning('*');
};

const update = (id, topic) => {
  console.log(topic);
  return db('topics')
    .where({ id: id })
    .first()
    .update(topic)
    .returning('*');
};

const remove = async (id) => {
  return await db('topics').where({ id }).del();
};

async function getAllAboutTopic(id) {
  const topic = await (
      db('topics')
      .select('id', 'leaderid', 'topicname', 'contextid', 'joincode')
      .where('id', id)
  )
  topicDetail = {
      ...topic,
      questions: await db('topic_questions')
      .select('id', 'questionid')
      .where('topicid', id),
      responses: await db('responses')
      .select('id', 'question_id', 'responses', 'respondedby')
      .where('topicid', id),
      notifications: await db('notifications')
      .select('id', 'sentto', 'notification')
      .where('topicid', id),
  }
  return topicDetail
}


module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
  getAllAboutTopic
};
