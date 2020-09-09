const express = require('express');
const authRequired = require('../middleware/authRequired');
const Contexts = require('./contextModel');
const router = express.Router();

router.get('/', authRequired, function (req, res) {
    Contexts.findAll()
      .then((context) => {
        res.status(200).json(context);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
  });

router.get('/:id', authRequired, function (req, res) {
  const id = String(req.params.id);
  Contexts.findById(id)
    .then((context) => {
      if (context) {
        res.status(200).json(context);
      } else {
        res.status(404).json({ error: 'contextNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', authRequired, async (req, res) => {
    const context = req.body;
    if (context) {
      const id = context.id || 0;
      try {
        await Contexts.findById(id).then(async (pf) => {
          if (pf == undefined) {
            //context not found so lets insert it
            await Contexts.create(context).then((context) =>
              res
                .status(200)
                .json({ message: 'context created', context: context[0] })
            );
          } else {
            res.status(400).json({ message: 'context already exists' });
          }
        });
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
      }
    } else {
      res.status(404).json({ message: 'context missing' });
    }
  });
  
router.put('/', authRequired, (req, res) => {
  const context = req.body;
  if (context) {
    const id = context.id || 0;
    Contexts.findById(id)
      .then(
        Contexts.update(id, context)
          .then((updated) => {
            res
              .status(200)
              .json({ message: 'context created', context: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update context '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find context '${id}'`,
          error: err.message,
        });
      });
  }
});
  
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    try {
      Contexts.findById(id).then((context) => {
        Contexts.remove(context.id).then(() => {
          res
            .status(200)
            .json({ message: `context '${id}' was deleted.`, context: context });
        });
      });
    } catch (err) {
      res.status(500).json({
        message: `Could not delete context with ID: ${id}`,
        error: err.message,
      });
    }
  });
  
module.exports = router;
