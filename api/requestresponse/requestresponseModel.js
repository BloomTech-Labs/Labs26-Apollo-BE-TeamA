const db = require("../../data/db-config");

const findAll = async () => {
  return await db("request_questions_response");
};

const findBy = (filter) => {
  return db("request_questions_response").where(filter);
};

const findById = async (id) => {
  return db("request_questions_response")
    .where({ surveyrequestid: id })
    .select("*");
};

const create = async (response) => {
  return db("request_questions_response").insert(response).returning("*");
};

const update = (id, response) => {
  console.log(response);
  return db("request_questions_response")
    .where({ surveyrequestid: id })
    .first()
    .update(response)
    .returning("*");
};

async function getAllReplyonResponse(id) {
  const topic = await db("survey_requests")
    .select("id", "topicid")
    .where({ surveyrequestid: id });
  topicDetail = {
    ...topic,
    requestquestions: await db("survey_request_questions")
      .select("requestquestionid")
      .where({ surveyrequestid: id }),
    responses: await db("request_questions_response")
      .select(
        "id",
        "surveyrequestid",
        "questionrequestid",
        "response",
        "respondedby"
      )
      .where({ surveyrequestid: id }),
  };
  return topicDetail;
}

const remove = async (id) => {
  return await db("request_questions_response")
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
  getAllReplyonResponse,
};
