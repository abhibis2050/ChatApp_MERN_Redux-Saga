const express = require("express");
const auth = require("../middlewares/auth");
const {
  registerUser,
  login,
  getAccessToken,
  authUser,
} = require("../controller/userController");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/accessToken").get(getAccessToken);
router.route("/authUser").get(auth,authUser);

module.exports = router;
