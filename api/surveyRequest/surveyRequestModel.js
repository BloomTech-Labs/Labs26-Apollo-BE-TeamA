const db = require('../../data/db-config');

const getSurveyRequestDetailed = async (surveyRequestId) => {
  const requestInfo = await db('survey_requests')
    .where({
      id: surveyRequestId,
    })
    .first();
  const context_responses = await db('context_questions_response')
    .where({ surveyrequestid: surveyRequestId })
    .join(
      'contextquestions',
      'contextquestions.id',
      'context_questions_response.contextquestionid'
    )
    .select(
      'contextquestions.question as context_question',
      'context_questions_response.response as context_response'
    );
  const requestquestions = await db('survey_request_questions')
    .where({
        surveyrequestid: surveyRequestId,
    })
    .join(
      'requestquestions',
      'requestquestions.id',
      'survey_request_questions.requestquestionid'
    )
    .select(
      'requestquestions.id',
      'survey_request_questions.content',
      'requestquestions.style'
    );
  return { ...requestInfo, context_responses, requestquestions };
};

const getRequestQuestions = async (requestId) => {
  return await db('survey_request_questions')
    .where({ surveyrequestid: requestId })
    .join(
      'requestquestions',
      'requestquestions.id',
      'survey_request_questions.requestquestionid'
    )
    .select('requestquestions.id', 'requestquestions.content');
};

const getRequestReplies = async (requestId) => {
  const replies = await db('request_questions_response')
    .where({
        surveyrequestid: requestId,
    })
    .join('users', 'users.id', 'request_questions_response.respondedby')
    .select('request_questions_response.*', 'users.firstname', 'users.lastname', 'users.avatarUrl');
  return replies;
};

const addRequestReplies = async (requestId, profileId, replies) => {
  const processedReplies = replies.map((reply) => {
    return { surveyrequestid: requestId, respondedby: profileId, ...reply };
  });

  await db('request_questions_response').insert(processedReplies);

  return getRequestReplies(requestId);
};

const getWhoHasReplied = async (surveyRequestId) => {
  const profileIds = await db('request_questions_response')
    .where({ surveyrequestid: surveyRequestId })
    .select('request_questions_response.respondedby');

  const uniqueProfileIds = [...new Set(profileIds.map((p) => p.respondedby))];

  return uniqueProfileIds;
};

const getTopicMembers = async (topicId) => {
  return await db('topicmembers')
    .where({ topicid: topicId })
    .join('users', 'users.id', 'topicmembers.memberid')
    .select('users.id', 'users.firstname', 'users.lastname', 'users.avatarUrl');
};

const getMemberRepliedStatus = async (surveyRequestId, topicId) => {
  const hasReplied = await getWhoHasReplied(surveyRequestId);
  const allMembers = await getTopicMembers(topicId);

  const membersWithStatus = allMembers.map((member) => {
    return {
      id: member.id,
      firstname: member.firstname,
      lastname: member.lastname,
      has_replied: hasReplied.includes(member.id),
    };
  });

  return membersWithStatus;
};

module.exports = {
  getSurveyRequestDetailed,
  getRequestQuestions,
  getRequestReplies,
  getWhoHasReplied,
  getMemberRepliedStatus,
  addRequestReplies,
};