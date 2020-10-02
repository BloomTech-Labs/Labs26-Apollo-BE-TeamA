const db = require('../../data/db-config');

const findAll = async () => {
  return await db('topic_context_questions');
};

const findBy = (filter) => {
  return db('topic_context_questions').where(filter);
};

const findById = async (id) => {
  return db('topic_context_questions').where({ topicid: id }).first().select('*');
};

const create = async (question) => {
  return db('topic_context_questions').insert(question).returning('*');
};

const update = (id, question) => {
  console.log(question);
  return db('topic_context_questions')
    .where({ topicid: id })
    .first()
    .update(question)
    .returning('*');
};

const remove = async (id) => {
  return await db('topic_context_questions').where({ topicid: id }).del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
};
