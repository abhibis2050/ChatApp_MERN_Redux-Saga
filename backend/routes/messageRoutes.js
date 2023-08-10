const express = require("express");
const auth = require("../middlewares/auth");
const { sendOneToOneMessage, sendGroupMessage, getAllGroupMessages, getAlloneToOneMessages } = require("../controller/messageController");

const router = express.Router();

router.route("/sendOneToOneMessage").post(auth,sendOneToOneMessage);
router.route("/sendGroupMessage").post(auth,sendGroupMessage);
router.route("/getAllGroupMessages").get(getAllGroupMessages);
router.route("/getAlloneToOneMessages").get(auth,getAlloneToOneMessages);

module.exports = router;
