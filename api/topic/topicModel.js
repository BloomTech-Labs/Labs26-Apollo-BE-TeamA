const db = require("../../data/db-config");
const Requests = require('../surveyRequest/surveyRequestModel');

const findEmail = async (id) => {
  return await db("users").where({ id }).first().select("email");
};

const findAll = async () => {
  return await db("topics");
};

const findBy = (filter) => {
  return db("topics").where(filter);
};

const getTopicMembers = async (topicid) => {
  return await db('topicmembers')
    .where({ topicid: topicid })
    .join('users', 'users.id', 'topicmembers.memberid')
    .select('users.id', 'users.firstname', 'users.avatarUrl');
};

const getTopicContextsQuestions = async (topicid) => {
  return await db('topic_context_questions')
    .where({ topicid: topicid })
    .join(
      'contextquestions',
      'topic_context_questions.contextquestionid',
      'contextquestions.id'
    )
    .select('contextquestions.id', 'contextquestions.question');
};

const getTopicDefaultContextQuestions = async (topicid) => {
  return await db('topic_context_questions')
    .where({ topicid: topicid })
    .join(
      'contextquestions',
      'topic_context_questions.contextquestionid',
      'contextquestions.id'
    )
    .select(
      'contextquestions.id',
      'contextquestions.question',
      'contextquestions.style'
    );
};

const getTopicDefaultRequestQuestions = async (topicid) => {
  return await db('topic_request_questions')
    .where({ topicid: topicid })
    .join(
      'requestquestions',
      'topic_request_questions.requestquestionid',
      'requestquestions.id'
    )
    .select(
      'requestquestions.id',
      'requestquestions.question',
      'requestquestions.style'
    );
};

const getSurveyRequest = async (topicid) => {
  return await db('survey_requests')
    .where({ topicid: topicid })
    .select('survey_requests.id', 'survey_requests.created_at');
};

const findById = async (id) => {
  const topicInfo = await db('topics').where({ id }).first();
  const members = await getTopicMembers(id);
  const context_questions = await getTopicContextsQuestions(id);
  const default_context_questions = await getTopicDefaultContextQuestions(id);
  const default_request_questions = await getTopicDefaultRequestQuestions(id);
  const topic_iteration_requests = await getSurveyRequest(id);

  return {
    ...topicInfo,
    members,
    context_questions,
    default_context_questions,
    default_request_questions,
    topic_iteration_requests,
  };
};

const addMemberToTopic = async (topicid, userid) => {
  await db('topicmembers').insert({
    topicid: topicid,
    memberid: userid,
  });
};

const addContextQuestionToTopic = async (context_questions, newTopicId) => {
  for (const context of context_questions) {
    const contextQuestion = await db('contextquestions')
      .where({ question: context })
      .first();

    if (contextQuestion) {
      await db('topic_context_questions').insert({
        topicid: newTopicId,
        contextquestionid: contextQuestion.id,
      });
    } else {
      const [contextQuestionId] = await db('contextquestions').insert(
        { question: context },
        'id'
      );
      await db('topic_context_questions').insert({
        topicid: newTopicId,
        contextquestionid: contextQuestionId,
      });
    }
  }
};

const addRequestQuestionToTopic = async (context_questions, newTopicId) => {
  for (const context of context_questions) {
    const contextQuestion = await db('requestquestions')
      .where({ question: context })
      .first();

    if (contextQuestion) {
      await db('topic_request_questions').insert({
        topicid: newTopicId,
        contextquestionid: contextQuestion.id,
      });
    } else {
      const [contextQuestionId] = await db('requestquestions').insert(
        { question: context },
        'id'
      );
      await db('topic_request_questions').insert({
        topicid: newTopicId,
        contextquestionid: contextQuestionId,
      });
    }
  }
};

const createTopic = async (topicInfo) => {
  const {
    leaderid,
    topicname,
    topicfrequency,
    joincode,
    contextid,
    context_questions,
    default_questions,
  } = topicInfo;

  const [newTopicId] = await db('topics').insert(
    { leaderid, topicname, topicfrequency, contextid, joincode },
    'id'
  );

  await addContextQuestionToTopic(context_questions, newTopicId);
  await addRequestQuestionToTopic(default_questions, newTopicId);

  return await findById(newTopicId);
};

const createSurveyRequest = async (topicId, requestQuestions, contextResponses) => {
  const [surveyrequestid] = await db('survey_requests').insert(
    {
      topicid: topicId,
    },
    'id'
  );
  for (const requestQuestion of requestQuestions) {
    const existingQuestion = await db('topic_request_questions')
      .where({ question: requestQuestion.question })
      .first();
    if (existingQuestion) {
      await db('survey_request_questions').insert({
        surveyrequestid: surveyrequestid,
        requestquestionid: existingQuestion.id,
      });
    } else {
      const [requestQuestionId] = await db('requestquestions').insert(
        {
          question: requestQuestion.question,
          type: requestQuestion.style,
        },
        'id'
      );
      await db('survey_request_questions').insert({
        surveyrequestid: surveyrequestid,
        requestquestionid: requestQuestionId,
      });
    }
  }
  for (const { id, question } of contextResponses) {
    await db('context_questions_response').insert({
      surveyrequestid: surveyrequestid,
      contextquestionid: id,
      question,
    });
  }
  return await Requests.getTopicRequestDetailed(surveyrequestid);
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


module.exports = {
  findEmail,
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
  createSurveyRequest,
  createTopic,
  addRequestQuestionToTopic,
  addContextQuestionToTopic,
  addMemberToTopic,
  getSurveyRequest,
  getTopicDefaultRequestQuestions,
  getTopicMembers
};
