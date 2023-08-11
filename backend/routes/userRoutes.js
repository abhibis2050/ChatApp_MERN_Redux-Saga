const express = require("express");
const auth = require("../middlewares/auth");
const {
  registerUser,
  login,
  getAccessToken,
  authUser,
  getSingleUserDetailsWithId,
} = require("../controller/userController");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/accessToken").get(getAccessToken);
router.route("/authUser").get(auth,authUser);
router.route("/getSingleUserDetailsWithId").get(getSingleUserDetailsWithId);

module.exports = router;
