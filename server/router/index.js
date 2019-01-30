const router = require("express").Router();
const bot = require("./bot");
const controllers = require("./controllers");

router.use("/bot", bot);
router.use(controllers);
module.exports = router;
