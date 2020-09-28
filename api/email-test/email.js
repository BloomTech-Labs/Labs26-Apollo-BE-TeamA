const router = require("express").Router();
const Topics = require("../topic/topicModel");
const authRequired = require("../middleware/authRequired");
const Profiles = require("../profile/profileModel");

router.get("/", (req, res) => {
  res.json({ api: "email router" });
});

// Need to pass in an userEmail argument to pass down to post
const emailService = (email) => {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRIDKEY);
  const msg = {
    to: `${email}`,
    from: "apolloappnotify@gmail.com",
    subject: "Confirmation from Apollo",
    text: "Your newly created topic has been posted.",
    html: "<strong>Your newly created topic has been posted.</strong>",
  };
  sgMail.send(msg);
};

// Need to pass the id of the user who posts new topic and drill down to their email addy
router.post("/", async (req, res) => {
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
          // Call to send email via sendgrid.
          Topics.findEmail(topic.leaderid).then((data) => {
            console.log(data.email);
            emailService(data.email);
          });
          // emailService();
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
});

module.exports = router;
