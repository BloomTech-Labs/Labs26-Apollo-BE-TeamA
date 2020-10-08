## API Documentation

(Draft)

### Base Url https://apollo-a-api.herokuapp.com/

| API | -- |
| --- | -- |
| GET | /  |

Response:
```
{
"api": "up",
"timestamp": 1602137863804
}
```
## PROFILE
| Request | Endpoint               | Description                                           |
| ------- | ----------             | ---------------                                       |
| GET     | /profile               | Gets users info                                       |
| GET     | /profiles              | Gets users info                                       |
| GET     | /profile/:id           | Gets specific user info                               |
| POST    | /profile               | Post new user                                         |
| PUT     | /profile/:id           | Edit user                                             |
| DELETE  | /profile/:id           | Delete user                                           |




## CONTEXT
| Request | Endpoint               | Description                                           |
| ------- | ----------             | --------------                                        |
| GET     | /context               | Gets context questions                                |
| GET     | /context/:id           | Gets specific question info                           |




## CONTEXT QUESTION
| Request | Endpoint                | Description                                          |
| ------- | ----------              | -------------                                        |
| GET     | /contextquestion        | Gets context question info                           |
| GET     | /contextquestion/:id    | Gets specific context info                           |
| POST    | /contextquestion        | Post new context question                            |
| PUT     | /contextquestion/:id    | Edit context question                                |
| DELETE  | /contextquestion/:id    | Delete context question                              |

#### JSON for POST & PUT
** requires unique ID and question.
```
{
        "id": 4,
        "question": "What will you do today?"
}
```
