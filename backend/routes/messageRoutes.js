const express = require("express");
const auth = require("../middlewares/auth");
const { sendOneToOneMessage } = require("../controller/messageController");

const router = express.Router();

router.route("/sendOneToOneMessage").post(sendOneToOneMessage);

module.exports = router;
