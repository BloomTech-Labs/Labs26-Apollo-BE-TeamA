const express = require('express');
const authRequired = require('../middleware/authRequired');
const Topicmembers = require('./topicmemberModel');
const router = express.Router();

router.get('/', authRequired, function (req, res) {
    Topicmembers.findAll()
      .then((topic) => {
        res.status(200).json(topic);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
  });

router.get('/:id', authRequired, function (req, res) {
  const id = String(req.params.id);
  Topicmembers.findById(id)
    .then((topic) => {
      if (topic) {
        res.status(200).json(topic);
      } else {
        res.status(404).json({ error: 'topicMembershipNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', authRequired, async (req, res) => {
    const topic = req.body;
    if (topic) {
      const id = topic.id || 0;
      try {
        await Topicmembers.findById(id).then(async (pf) => {
          if (pf == undefined) {
            //topicmember not found so lets insert it
            await Topicmembers.create(topic).then((topic) =>
              res
                .status(200)
                .json({ message: 'topic membership created', topic: topic[0] })
            );
          } else {
            res.status(400).json({ message: 'topic member already exists' });
          }
        });
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
      }
    } else {
      res.status(404).json({ message: 'topic member missing' });
    }
  });
  
router.put('/', authRequired, (req, res) => {
  const topic = req.body;
  if (topic) {
    const id = topic.id || 0;
    Topicmembers.findById(id)
      .then(
        Topicmembers.update(id, topic)
          .then((updated) => {
            res
              .status(200)
              .json({ message: 'topic membership created', topic: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update topic membership '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find topic membership'${id}'`,
          error: err.message,
        });
      });
  }
});
  
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    try {
      Topicmembers.findById(id).then((topic) => {
        Topicmembers.remove(topic.id).then(() => {
          res
            .status(200)
            .json({ message: `topic membership '${id}' was deleted.`, topic: topic });
        });
      });
    } catch (err) {
      res.status(500).json({
        message: `Could not delete topic membership with ID: ${id}`,
        error: err.message,
      });
    }
  });
  
module.exports = router;
