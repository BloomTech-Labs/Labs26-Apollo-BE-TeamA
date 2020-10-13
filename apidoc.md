## API Documentation

(Draft)

### Base Url https://apollo-a-api.herokuapp.com/

| API |     |
| --- | --- |
| GET | /   |

Response:

```
{
"api": "up",
"timestamp": 1602137863804
}
```

## PROFILE

| Request | Endpoint     | Description             |
| ------- | ------------ | ----------------------- |
| GET     | /profile     | Gets users info         |
| GET     | /profiles    | Gets users info         |
| GET     | /profile/:id | Gets specific user info |
| POST    | /profile     | Post new user           |
| PUT     | /profile/:id | Edit user               |
| DELETE  | /profile/:id | Delete user             |

## CONTEXT

| Request | Endpoint     | Description                 |
| ------- | ------------ | --------------------------- |
| GET     | /context     | Gets context questions      |
| GET     | /context/:id | Gets specific question info |

## CONTEXT QUESTION

| Request | Endpoint             | Description                |
| ------- | -------------------- | -------------------------- |
| GET     | /contextquestion     | Gets context question info |
| GET     | /contextquestion/:id | Gets specific context info |
| POST    | /contextquestion     | Post new context question  |
| PUT     | /contextquestion/:id | Edit context question      |
| DELETE  | /contextquestion/:id | Delete context question    |

#### JSON for POST & PUT

\*\* requires unique ID and question.

```
{
        "id": 4,
        "question": "What will you do today?"
}
```

## CONTEXT RESPONSE

| Request | Endpoint                          | Description                         |
| ------- | --------------------------------- | ----------------------------------- |
| GET     | /contextresponse                  | Gets context response response info |
| GET     | /contextresponse/:id              | Gets survey request info            |
| POST    | /contextresponse                  | Post new context response question  |
| PUT     | /contextresponse                  | Edit context response question      |
| DELETE  | /contextresponse/:surveyrequestid | Delete context response question    |

#### JSON for POST & PUT

\*\* surveyrequest and contextquestionid must be db

```
{
        "surveyrequestid": 2,
        "contextquestionid": 1,
        "response": "hello test"
}
```

## TOPIC

| Request | Endpoint           | Description                      |
| ------- | ------------------ | -------------------------------- |
| GET     | /topic             | Gets topic info                  |
| GET     | /topic/:id         | Gets topic by :id info           |
| GET     | /topic/:id/details | Gets topic details by :id info   |
| POST    | /topic             | Posts new topic                  |
| PUT     | /topic             | Edits topic                      |
| DELETE  | /topic/:id         | Delete context response question |

#### JSON for POST & PUT

```
{
     "leaderid": "00ulthapbErVUwVJy4x6",
     "topicname": "Topic",
     "topicfrequency": "Off",
     "contextid": 5,
     "joincode": "111111", //must be unique
     "created_at": "2020-10-08T16:59:55.206Z",
     "updated_at": "2020-10-08T16:59:55.206Z"
}
```

## THREAD

| Request | Endpoint    | Description             |
| ------- | ----------- | ----------------------- |
| GET     | /thread     | Gets thread info        |
| GET     | /thread/:id | Gets thread by :id info |
| POST    | /thread     | Posts new thread        |
| PUT     | /thread     | Edits thread            |
| DELETE  | /thread/:id | Deletes thread          |

#### JSON for POST & PUT

```
{
       "id": 4, // Must be unique
       "responseid": 1,
       "reply": "rowValue1",
       "repliedby": "00ulthapbErVUwVJy4x6"
}

```

## TOPIC MEMBER

| Request | Endpoint         | Description                   |
| ------- | ---------------- | ----------------------------- |
| GET     | /topicmember     | Gets topic member info        |
| GET     | /topicmember/:id | Gets topic member by :id info |
| POST    | /topicmember     | Posts new topic member        |
| PUT     | /topicmember     | Edits topic member            |
| DELETE  | /topicmember/:id | Deletes topic member          |

## SURVEY REQUEST

| Request | Endpoint           | Description                     |
| ------- | ------------------ | ------------------------------- |
| GET     | /surveyrequest     | Gets survey request info        |
| GET     | /surveyrequest/:id | Gets survey request by :id info |
| POST    | /surveyrequest     | Posts new survey request        |
| PUT     | /surveyrequest     | Edits survey request            |
| DELETE  | /surveyrequest/:id | Deletes survey request          |

#### JSON for POST & PUT

```
{
    "id": 5, // required
    "topicid": 1 // must be in db
}

```

## REQUEST QUESTION

| Request | Endpoint             | Description                |
| ------- | -------------------- | -------------------------- |
| GET     | /requestquestion     | Gets request question info |
| POST    | /requestquestion     | Posts new request question |
| PUT     | /requestquestion     | Edits request question     |
| DELETE  | /requestquestion/:id | Deletes request question   |

#### JSON for POST & PUT

```
{

}
```

## REQUEST RESPONSE

| Request | Endpoint                                  | Description                               |
| ------- | ----------------------------------------- | ----------------------------------------- |
| GET     | /requestresponse                          | Gets request response info                |
| GET     | /requestresponse/:surveyrequestid         | Gets request response by :id info         |
| GET     | /requestresponse/:surveyrequestid/details | Gets request response details by :id info |
| POST    | /requestresponse                          | Posts new request response                |
| PUT     | /requestresponse                          | Edits request response                    |
| DELETE  | /requestresponse/:id                      | Deletes request response                  |

#### JSON for POST & PUT

```
{

}

```
