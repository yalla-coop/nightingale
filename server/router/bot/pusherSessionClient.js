const Pusher = require("pusher");

module.exports = (channel, action, message) => new Promise((resolve, reject) => {
  // setup pusher config
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    encrypted: true,
  });

  resolve(pusher.trigger(channel, action, message));
});
