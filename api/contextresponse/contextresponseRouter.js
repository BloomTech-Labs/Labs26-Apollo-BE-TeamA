const express = require("express");
const authRequired = require("../middleware/authRequired");
const ContextResponses = require("./contextresponseModel");
const router = express.Router();

router.get("/", authRequired, function (req, res) {
  ContextResponses.findAll()
    .then((contextresponse) => {
      res.status(200).json(contextresponse);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get("/:surveyrequestid", authRequired, function (req, res) {
  const id = String(req.params.id);
  ContextResponses.findById(id)
    .then((contextresponse) => {
      if (contextresponse) {
        res.status(200).json(contextresponse);
      } else {
        res.status(404).json({ error: "contextresponseNotFound" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/", authRequired, async (req, res) => {
  const contextresponse = req.body;
  if (contextresponse) {
    const id = contextresponse.id || 0;
    try {
      await ContextResponses.findById(id).then(async (pf) => {
        if (pf == undefined) {
          //profile not found so lets insert it
          await ContextResponses.create(contextresponse).then((contextresponse) =>
            res
              .status(200)
              .json({ message: "contextresponse created", contextresponse: contextresponse[0] })
          );
        } else {
          res.status(400).json({ message: "contextresponse already exists" });
        }
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(404).json({ message: "contextresponse missing" });
  }
});

router.put("/", authRequired, (req, res) => {
  const contextresponse = req.body;
  if (contextresponse) {
    const id = contextresponse.id || 0;
    ContextResponses.findById(id)
      .then(
        ContextResponses.update(id, contextresponse)
          .then((updated) => {
            res
              .status(200)
              .json({ message: "contextresponse created", contextresponse: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update contextresponse '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find contextresponse '${id}'`,
          error: err.message,
        });
      });
  }
});

router.delete("/:surveyrequestid", (req, res) => {
  const id = req.params.id;
  try {
    ContextResponses.findById(id).then((contextresponse) => {
      ContextResponses.remove(contextresponse.id).then(() => {
        res
          .status(200)
          .json({
            message: `contextresponse '${id}' was deleted.`,
            contextresponse: contextresponse,
          });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete contextresponse with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
