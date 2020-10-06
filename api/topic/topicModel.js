const db = require("../../data/db-config");

const findEmail = async (id) => {
  return await db("users").where({ id }).first().select("email");
};

const findAll = async () => {
  return await db("topics");
};

const findBy = (filter) => {
  return db("topics").where(filter);
};

const findById = async (id) => {
  return db("topics").where({ id }).first().select("*");
};

const create = async (topic) => {
  return db("topics").insert(topic).returning("*");
};

const update = (id, topic) => {
  console.log(topic);
  return db("topics").where({ id: id }).first().update(topic).returning("*");
};

const remove = async (id) => {
  return await db("topics").where({ id }).del();
};

async function getAllAboutTopic(id) {
  const topic = await db("topics")
    .select("id", "leaderid", "topicname", "contextid", "joincode")
    .where({ id: id });
  topicDetail = {
    ...topic,
    contextquestions: await db("topic_context_questions")
      .select("contextquestionid")
      .where({ topicid: id }),
    requestquestions: await db("topic_request_questions")
      .select("requestquestionid")
      .where({ topicid: id }),
    notifications: await db("notifications")
      .select("id", "sentto", "notification")
      .where({ topicid: id }),
  };
  return topicDetail;
}

module.exports = {
  findEmail,
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
  getAllAboutTopic,
};
