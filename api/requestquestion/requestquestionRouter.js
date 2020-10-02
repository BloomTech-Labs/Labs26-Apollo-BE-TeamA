const express = require("express");
const authRequired = require("../middleware/authRequired");
const Questions = require("./requestquestionModel");
const router = express.Router();

router.get("/", authRequired, function (req, res) {
  Questions.findAll()
    .then((question) => {
      res.status(200).json(question);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get("/surveyrequestid", authRequired, function (req, res) {
  const id = String(req.params.id);
  Questions.findById(id)
    .then((question) => {
      if (question) {
        res.status(200).json(question);
      } else {
        res.status(404).json({ error: "QuestionNotFound" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/", authRequired, async (req, res) => {
  const question = req.body;
  if (question) {
    const id = question.id || 0;
    try {
      await Questions.findById(id).then(async (pf) => {
        if (pf == undefined) {
          //profile not found so lets insert it
          await Questions.create(question).then((question) =>
            res
              .status(200)
              .json({ message: "question created", question: question[0] })
          );
        } else {
          res.status(400).json({ message: "question already exists" });
        }
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(404).json({ message: "question missing" });
  }
});

router.put("/", authRequired, (req, res) => {
  const question = req.body;
  if (question) {
    const id = question.id || 0;
    Questions.findById(id)
      .then(
        Questions.update(id, question)
          .then((updated) => {
            res
              .status(200)
              .json({ message: "question created", question: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update question '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find question '${id}'`,
          error: err.message,
        });
      });
  }
});

router.delete("/surveyrequestid", (req, res) => {
  const id = req.params.id;
  try {
    Questions.findById(id).then((question) => {
      Questions.remove(question.id).then(() => {
        res
          .status(200)
          .json({
            message: `question '${id}' was deleted.`,
            question: question,
          });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete question with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
