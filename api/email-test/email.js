const router = require("express").Router();
const Topics = require("../topic/topicModel");
const authRequired = require("../middleware/authRequired");

router.get("/", (req, res) => {
  res.json({ api: "email router" });
});

const emailService = () => {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "apolloappnotify@gmail.com",
    from: "apolloappnotify@gmail.com",
    subject: "Sending with Twilio SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  sgMail.send(msg);
};

router.post("/", authRequired, async (req, res) => {
  const topic = req.body;
  if (topic) {
    const id = topic.id || 0;
    try {
      await Topics.findById(id).then(async (pf) => {
        if (pf == undefined) {
          //profile not found so lets insert it
          await Topics.create(topic).then((topic) =>
            res.status(200).json({ message: "topic created", topic: topic[0] })
          );
          emailService();
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
  emailService();
});

module.exports = router;
