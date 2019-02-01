const router = require("express").Router();
const bot = require("./bot");
const controllers = require("./controllers");

router.use("/test", (req, res) => {
  console.log("reached");
  res.status(200).send("Hello");
});

router.use("/bot", bot);
router.use(controllers);

module.exports = router;
