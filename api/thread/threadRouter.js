const express = require('express');
const authRequired = require('../middleware/authRequired');
const Threads = require('./threadModel');
const router = express.Router();

router.get('/', authRequired, function (req, res) {
    Threads.findAll()
      .then((thread) => {
        res.status(200).json(thread);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
  });

router.get('/:id', authRequired, function (req, res) {
  const id = String(req.params.id);
  Threads.findById(id)
    .then((thread) => {
      if (thread) {
        res.status(200).json(thread);
      } else {
        res.status(404).json({ error: 'threadNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', authRequired, async (req, res) => {
    const thread = req.body;
    if (thread) {
      const id = thread.id || 0;
      try {
        await Threads.findById(id).then(async (pf) => {
          if (pf == undefined) {
            //profile not found so lets insert it
            await Threads.create(thread).then((thread) =>
              res
                .status(200)
                .json({ message: 'thread created', thread: thread[0] })
            );
          } else {
            res.status(400).json({ message: 'thread already exists' });
          }
        });
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
      }
    } else {
      res.status(404).json({ message: 'thread missing' });
    }
  });
  
router.put('/', authRequired, (req, res) => {
  const thread = req.body;
  if (thread) {
    const id = thread.id || 0;
    Threads.findById(id)
      .then(
        Threads.update(id, thread)
          .then((updated) => {
            res
              .status(200)
              .json({ message: 'thread created', thread: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update thread '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find thread '${id}'`,
          error: err.message,
        });
      });
  }
});
  
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    try {
      Threads.findById(id).then((thread) => {
        Threads.remove(thread.id).then(() => {
          res
            .status(200)
            .json({ message: `thread '${id}' was deleted.`, thread: thread });
        });
      });
    } catch (err) {
      res.status(500).json({
        message: `Could not delete thread with ID: ${id}`,
        error: err.message,
      });
    }
  });
  
module.exports = router;
