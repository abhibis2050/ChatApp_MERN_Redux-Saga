const express = require("express");
const auth = require("../middlewares/auth");
const {
  registerUser,
  login,
  getAccessToken,
  authUser,
  getSingleUserDetailsWithId,
  getAllUsers,
} = require("../controller/userController");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/accessToken").get(getAccessToken);
router.route("/authUser").get(auth,authUser);
router.route("/getSingleUserDetailsWithId").get(getSingleUserDetailsWithId);
router.route("/getAllUsers").get(getAllUsers);
module.exports = router;
