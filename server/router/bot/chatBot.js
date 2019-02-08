// // calls pusher function

// const Pusher = require("pusher");
// const dialogflowResponse = require("./dialogflowSessionClient");

// module.exports = async (req, res) => {
//   // setup pusher config
//   const pusher = new Pusher({
//     appId: process.env.PUSHER_APP_ID,
//     key: process.env.PUSHER_APP_KEY,
//     secret: process.env.PUSHER_APP_SECRET,
//     cluster: process.env.PUSHER_APP_CLUSTER,
//     encrypted: true,
//   });

//   await dialogflowResponse(req.body.message)
//     .then((responses) => {
//       const result = responses[0].queryResult;
//       const messageArr = result.fulfillmentMessages;

//       // check if queryResult and intent are defined
//       if (result && result.intent) {
//         // syntax: channel.trigger(eventName, data)
//         // send over array of fullfilment messages
//         pusher.trigger("bot", "bot-response", {
//           message: messageArr,
//         });
//       }
//       console.log("no intent matched");
//       return res.sendStatus(200);
//     })
//     .catch((err) => {
//       console.error("ERROR:", err);
//     });
// };
