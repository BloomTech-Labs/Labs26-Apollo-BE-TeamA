const express = require('express');
const authRequired = require('../middleware/authRequired');
const Topicquestions = require('./topicquestionModel');
const router = express.Router();

router.get('/', authRequired, function (req, res) {
    Topicquestions.findAll()
      .then((topicquestion) => {
        res.status(200).json(topicquestion);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
  });

router.get('/:id', authRequired, function (req, res) {
  const id = String(req.params.id);
  Topicquestions.findById(id)
    .then((topicquestion) => {
      if (topicquestion) {
        res.status(200).json(topicquestion);
      } else {
        res.status(404).json({ error: 'topicquestionNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', authRequired, async (req, res) => {
    const topicquestion = req.body;
    if (topicquestion) {
      const id = topicquestion.id || 0;
      try {
        await Topicquestions.findById(id).then(async (pf) => {
          if (pf == undefined) {
            await Topicquestions.create(topicquestion).then((topicquestion) =>
              res
                .status(200)
                .json({ message: 'topicquestion created', topicquestion: topicquestion[0] })
            );
          } else {
            res.status(400).json({ message: 'topicquestion already exists' });
          }
        });
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
      }
    } else {
      res.status(404).json({ message: 'topicquestion missing' });
    }
  });
  
router.put('/', authRequired, (req, res) => {
  const topicquestion = req.body;
  if (topicquestion) {
    const id = topicquestion.id || 0;
    Topicquestions.findById(id)
      .then(
        Topicquestions.update(id, topicquestion)
          .then((updated) => {
            res
              .status(200)
              .json({ message: 'topicquestion created', topicquestion: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update topicquestion '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find topicquestion '${id}'`,
          error: err.message,
        });
      });
  }
});
  
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    try {
      Topicquestions.findById(id).then((topicquestion) => {
        Topicquestions.remove(topicquestion.id).then(() => {
          res
            .status(200)
            .json({ message: `topicquestion '${id}' was deleted.`, topicquestion: topicquestion });
        });
      });
    } catch (err) {
      res.status(500).json({
        message: `Could not delete topicquestion with ID: ${id}`,
        error: err.message,
      });
    }
  });
  
module.exports = router;
