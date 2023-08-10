const express = require("express");
const auth = require("../middlewares/auth");
const { createChat, getAllChats } = require("../controller/chatController");

const router = express.Router();

router.route("/createChat").post(auth,createChat);
router.route("/getAllChats").get(auth,getAllChats);



module.exports = router;