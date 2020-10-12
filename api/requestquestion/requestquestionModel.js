const db = require("../../data/db-config");

const findAll = async () => {
  return await db("survey_request_questions");
};

const findBy = (filter) => {
  return db("survey_request_questions").where(filter);
};

const findById = async (id) => {
  return db("survey_request_questions")
    .where({ surveyrequestid: id })
    .first()
    .select("*");
};

const create = async (question) => {
  return db("survey_request_questions").insert(question).returning("*");
};

const update = (id, question) => {
  console.log(question);
  return db("survey_request_questions")
    .where({ surveyrequestid: id })
    .first()
    .update(question)
    .returning("*");
};

const remove = async (id) => {
  return await db("survey_request_questions")
    .where({ surveyrequestid: id })
    .del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
};
