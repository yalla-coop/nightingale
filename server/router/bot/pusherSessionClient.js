const Pusher = require("pusher");

module.exports = (channel, action, message) => new Promise((resolve, reject) => {
  // setup pusher config
  console.log(process.env.PUSHER_APP_ID, "process.env.PUSHER_APP_ID");
  console.log(process.env.PUSHER_APP_KEY, "process.env.PUSHER_APP_KEY");
  console.log(process.env.PUSHER_APP_SECRET, "process.env.PUSHER_APP_SECRET");
  console.log(process.env.PUSHER_APP_CLUSTER, "process.env.PUSHER_APP_CLUSTER");

  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    encrypted: true,
  });

  resolve(pusher.trigger(channel, action, message));
});
