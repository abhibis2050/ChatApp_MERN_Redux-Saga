const express = require("express");
const auth = require("../middlewares/auth");
const {
  createGroup,
  addGroupMembers,
  AddGroupAdmin,
  UsersNotPresentInGroup,
} = require("../controller/groupController");

const router = express.Router();

router.route("/createGroup").post(auth, createGroup);
router.route("/addGroupMembers").patch(auth, addGroupMembers);
router.route("/UsersNotPresentInGroup").patch(UsersNotPresentInGroup);
router.route("/AddGroupAdmin").patch(auth, AddGroupAdmin);

module.exports = router;
