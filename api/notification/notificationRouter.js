const express = require('express');
const authRequired = require('../middleware/authRequired');
const Notifications = require('./notificationModel');
const router = express.Router();

router.get('/', authRequired, function (req, res) {
    Notifications.findAll()
      .then((notification) => {
        res.status(200).json(notification);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
  });

router.get('/:id', authRequired, function (req, res) {
  const id = String(req.params.id);
  Notifications.findById(id)
    .then((notification) => {
      if (notification) {
        res.status(200).json(notification);
      } else {
        res.status(404).json({ error: 'notificationNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', authRequired, async (req, res) => {
    const notification = req.body;
    if (notification) {
      const id = notification.id || 0;
      try {
        await Notifications.findById(id).then(async (pf) => {
          if (pf == undefined) {
            //profile not found so lets insert it
            await Notifications.create(notification).then((notification) =>
              res
                .status(200)
                .json({ message: 'notification created', notification: notification[0] })
            );
          } else {
            res.status(400).json({ message: 'notification already exists' });
          }
        });
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
      }
    } else {
      res.status(404).json({ message: 'notification missing' });
    }
  });
  
router.put('/', authRequired, (req, res) => {
  const notification = req.body;
  if (notification) {
    const id = notification.id || 0;
    Notifications.findById(id)
      .then(
        Notifications.update(id, notification)
          .then((updated) => {
            res
              .status(200)
              .json({ message: 'notification created', notification: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update notification '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find notification '${id}'`,
          error: err.message,
        });
      });
  }
});
  
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    try {
      Notifications.findById(id).then((notification) => {
        Notifications.remove(notification.id).then(() => {
          res
            .status(200)
            .json({ message: `notification '${id}' was deleted.`, notification: notification });
        });
      });
    } catch (err) {
      res.status(500).json({
        message: `Could not delete notification with ID: ${id}`,
        error: err.message,
      });
    }
  });
  
module.exports = router;
