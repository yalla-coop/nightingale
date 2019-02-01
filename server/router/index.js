const router = require("express").Router();
const bot = require("./bot");
const controllers = require("./controllers");

router.use("/bot", bot);
router.use(controllers);

router.use("/test", (req, res) => {
  console.log("reached");
  res.status(200).send("Hello");
});

module.exports = router;
