// Email Service Function
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

module.exports = emailService;
