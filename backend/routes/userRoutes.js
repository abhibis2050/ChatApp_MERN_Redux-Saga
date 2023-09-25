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
  getAllRecivedFriendRequest,
  getAllSendFriendRequest,
  getAllFriendId,
  getAllRecivedFriendRequestId,
  getAllSendFriendRequestId,
  CancelRecivedFriendRequest,
  Unfriend,
  CancelSendFriendRequest,
  updateProfilePicture,
  allUsersBasedOnSearch,
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
router.route("/getAllFriendId").get(getAllFriendId);
router.route("/getAllRecivedFriendRequestId").get(getAllRecivedFriendRequestId);
router.route("/getAllSendFriendRequestId").get(getAllSendFriendRequestId);
router.route("/CancelSendFriendRequest").get(CancelSendFriendRequest);
router.route("/CancelRecivedFriendRequest").get(CancelRecivedFriendRequest);
router.route("/Unfriend").get(Unfriend);
router.route("/updateProfilePicture").patch(updateProfilePicture);
router.route("/getUsersBySearch").get(allUsersBasedOnSearch);
module.exports = router;
