const express = require("express");
const authRequired = require("../middleware/authRequired");
const SurveyRequests = require("./surveyRequestModel");
const router = express.Router();

router.get("/", authRequired, function (req, res) {
  SurveyRequests.findAll()
    .then((surveyRequest) => {
      res.status(200).json(surveyRequest);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get("/:id", authRequired, function (req, res) {
  const id = String(req.params.id);
  SurveyRequests.findById(id)
    .then((surveyRequest) => {
      if (surveyRequest) {
        res.status(200).json(surveyRequest);
      } else {
        res.status(404).json({ error: "surveyRequestNotFound" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/", authRequired, async (req, res) => {
  const surveyRequest = req.body;
  if (surveyRequest) {
    const id = surveyRequest.id || 0;
    try {
      await SurveyRequests.findById(id).then(async (pf) => {
        if (pf == undefined) {
          //profile not found so lets insert it
          await SurveyRequests.create(surveyRequest).then((surveyRequest) =>
            res
              .status(200)
              .json({ message: "surveyRequest created", surveyRequest: surveyRequest[0] })
          );
        } else {
          res.status(400).json({ message: "surveyRequest already exists" });
        }
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(404).json({ message: "surveyRequest missing" });
  }
});

router.put("/", authRequired, (req, res) => {
  const surveyRequest = req.body;
  if (surveyRequest) {
    const id = surveyRequest.id || 0;
    SurveyRequests.findById(id)
      .then(
        SurveyRequests.update(id, surveyRequest)
          .then((updated) => {
            res
              .status(200)
              .json({ message: "surveyRequest created", surveyRequest: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update surveyRequest '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find surveyRequest '${id}'`,
          error: err.message,
        });
      });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  try {
    SurveyRequests.findById(id).then((surveyRequest) => {
      SurveyRequests.remove(surveyRequest.id).then(() => {
        res
          .status(200)
          .json({
            message: `surveyRequest '${id}' was deleted.`,
            surveyRequest: surveyRequest,
          });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete surveyRequest with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
