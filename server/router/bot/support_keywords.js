const nodemailer = require("nodemailer");
const getThreatConversation = require("./../../database/queries/get_threat_conversation");
const mailBuilder = require("./mail_builder");
const checkSupportKeywords = require("./../../database/queries/check_support_keywords");

module.exports = (userMessage, userId) => new Promise((resolve, reject) => {
  checkSupportKeywords(userMessage)
    .then((keywords) => {
      // if no support keywords matched return false
      if (!keywords.length > 0) return resolve(false);

      // get the conversation that which help detected
      return getThreatConversation(userId)
        .then((result) => {
          // if no results that mens no need for support
          if (result.length === 0) {
            return resolve(false);
          }

          const { userInfo, messages } = result[0];

          // build the email body
          const emailHTML = mailBuilder(userInfo, messages, keywords);
          // Create a SMTP transporter object
          const transporter = nodemailer.createTransport(
            {
              host: "smtp.gmail.com",
              port: 587,
              secure: false,
              auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
              },
              logger: true,
              debug: false, // include SMTP traffic in the logs
            },
            {
              // sender info
              from: "Nightingale Bot <nightingalewellbeing@gmail.com>",
            },
          );

          // Message object
          const message = {
            // Comma separated list of recipients
            to: process.env.STAFF,

            // Subject of the message
            subject: "Support needed",

            // HTML body
            html: emailHTML,
          };

          return transporter.sendMail(message, (error) => {
            if (error) {
              reject(error);
            }
            resolve(true);
            return transporter.close();
          });
        }).catch(reject);
    });
});
