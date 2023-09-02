const express = require("express");
const auth = require("../middlewares/auth");
const {
  registerUser,
  login,
  getAccessToken,
  authUser,
  getSingleUserDetailsWithId,
  getAllUsers,
  sendFriendRequest,
  acceptFriendRequest,
  getAllFriendList,
  getAllSentFriendRequest,
  getAllRecivedFriendRequest,
  getAllSendFriendRequest,
} = require("../controller/userController");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/accessToken").get(getAccessToken);
router.route("/authUser").get(auth, authUser);
router.route("/getSingleUserDetailsWithId").get(getSingleUserDetailsWithId);
router.route("/getAllUsers").get(getAllUsers);
router.route("/sendFriendRequest").get(sendFriendRequest);
router.route("/acceptFriendRequest").get(acceptFriendRequest);
router.route("/getAllFriendList").get(getAllFriendList);
router.route("/getAllRecivedFriendRequest").get(getAllRecivedFriendRequest);
router.route("/getAllSendFriendRequest").get(getAllSendFriendRequest);
module.exports = router;
