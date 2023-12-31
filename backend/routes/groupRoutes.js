const express = require("express");
const auth = require("../middlewares/auth");
const {
  createGroup,
  addGroupMembers,
  UsersNotPresentInGroup,
  updateAsGroupAdmin,
  RemovefromGroupAdmin,
  getAllGroups,
  getGroupById,
  updateGroupProfilePicture,
  removeMemberFromGroup,
} = require("../controller/groupController");

const router = express.Router();

router.route("/createGroup").post(auth, createGroup);
router.route("/addGroupMembers").patch(auth, addGroupMembers);
router.route("/UsersNotPresentInGroup").patch(UsersNotPresentInGroup);
router.route("/updateAsGroupAdmin").patch(auth, updateAsGroupAdmin);
router.route("/RemovefromGroupAdmin").patch(auth, RemovefromGroupAdmin);
router.route("/getAllGroups").get( getAllGroups);
router.route("/getGroupById").get( getGroupById);
router.route("/updateGroupProfilePicture").patch(updateGroupProfilePicture);
router.route("/removeMemberFromGroup").patch(removeMemberFromGroup);
module.exports = router;
