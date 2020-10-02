const express = require("express");

const router = express.Router();

const db = require("../../data/db-config.js");

const questions = () => {
  const correct = db("questions").select("*");
  return correct;
};

const requestQuestions = () => {
  return db("topic_questions");
};

router.get("/", (req, res) => {
  res.json({ api: "from the questions router." });
});

router.get("/c", (req, res) => {
  questions().then((data) => {
    // console.log(data.slice(0, 3));
    res.json(data.slice(0, 3));
  });
});

router.get("/r", (req, res) => {
  questions().then((data) => {
    // console.log(data.slice(3));
    res.json(data.slice(3));
  });
});

module.exports = router;
