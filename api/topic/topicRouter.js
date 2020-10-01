const express = require("express");
const authRequired = require("../middleware/authRequired");
const Topics = require("./topicModel");
const router = express.Router();

//EMAIL SERVICE
const emailService = require("../sendgrid/topicEmail.js");

router.get("/", authRequired, function (req, res) {
  Topics.findAll()
    .then((topic) => {
      res.status(200).json(topic);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get("/:id", authRequired, function (req, res) {
  const id = String(req.params.id);
  Topics.findById(id)
    .then((topic) => {
      if (topic) {
        res.status(200).json(topic);
      } else {
        res.status(404).json({ error: "topicNotFound" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});


router.post("/", authRequired, async (req, res) => {
  const topic = req.body;
  if (topic) {
    const id = topic.id || 0;
    try {
      await Topics.findById(id).then(async (pf) => {
        if (pf == undefined) {
          //profile not found so lets insert it
          await Topics.createTopic(topic).then((topic) =>
            res.status(200).json({ message: "topic created", topic: topic[0] })
          );

          // Call to send email via sendgrid.
          Topics.findEmail(topic.leaderid).then((data) => {
            console.log(data.email);
            emailService(data.email);
          });
        } else {
          res.status(400).json({ message: "topic already exists" });
        }
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(404).json({ message: "topic missing" });
  }
});

router.post('/:id/membership', (req, res) => {
  const id = req.params.id;
  const profileId = req.body.userid;
  Topics.addMemberToTopic(id, profileId)
    .then(() => {
      res
        .status(200)
        .json({ message: `Member ${profileId} is added to the Topic ${id}.` });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: `We are sorry, Internal server error, ${error}` });
    });
});

router.post('/:topicid/surveyrequest', (req, res) => {
  const topicid = req.params.topicid;
  const { request_questions, context_responses } = req.body;
  Topics.createSurveyRequest(topicid, request_questions, context_responses)
    .then((request) => {
      res.status(201).json(request);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: `We are sorry, Internal server error, ${error}` });
    });
});


router.put("/", authRequired, (req, res) => {
  const topic = req.body;
  if (topic) {
    const id = topic.id || 0;
    Topics.findById(id)
      .then(
        Topics.update(id, topic)
          .then((updated) => {
            res
              .status(200)
              .json({ message: "topic created", topic: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update topic '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find topic '${id}'`,
          error: err.message,
        });
      });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  try {
    Topics.findById(id).then((topic) => {
      Topics.remove(topic.id).then(() => {
        res
          .status(200)
          .json({ message: `topic '${id}' was deleted.`, topic: topic });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete topic with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
