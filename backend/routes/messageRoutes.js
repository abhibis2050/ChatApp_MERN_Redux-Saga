const express = require("express");
const auth = require("../middlewares/auth");
const { sendOneToOneMessage, sendGroupMessage, getAllGroupMessages } = require("../controller/messageController");

const router = express.Router();

router.route("/sendOneToOneMessage").post(auth,sendOneToOneMessage);
router.route("/sendGroupMessage").post(auth,sendGroupMessage);
router.route("/getAllGroupMessages").get(getAllGroupMessages);

module.exports = router;
