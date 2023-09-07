const Group = require("../models/group");
const User = require("../models/user");

const mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectId;

exports.createGroup = async (req, res) => {
  try {
    console.log(req.user);
    req.body.CreatedBy = req.user;
    const checkGroup = await Group.findOne({ groupName: req.body.groupName });
    if (checkGroup) {
      return res.status(400).send({
        success: false,
        message: "Group With This Name Already Exists",
      });
    }
    const createGroup = await Group.create(req.body);
    await Group.findOneAndUpdate(
      { _id: createGroup._id },
      {
        $push: {
          groupMembers: req.user,
          groupAdmins: req.user,
        },
      }
    );
    await User.findOneAndUpdate(
      { _id: req.user },
      { $push: { groupIds: createGroup?._id } }
    );

    return res.status(201).send({
      success: true,
      message: "Group Created Successfully",
      data: createGroup,
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.UsersNotPresentInGroup = async (req, res) => {
  const { AllUsers } = req.body;
  const { groupId } = req.query;

  if (!groupId) {
    return res.status(400).send({ success: true, messages: "Enter Group Id" });
  }
  let remainingUser = [];

  const findGroup = await Group.findOneAndUpdate({
    _id: groupId,
  });

  const alreadyGroupMembers = findGroup?.groupMembers;

  console.log("AlreadygroupMembers--------->", alreadyGroupMembers);

  AllUsers.map((singleUser) => {
    if (alreadyGroupMembers.includes(singleUser) === false) {
      remainingUser.push(singleUser);
    }
  });

  //   console.log("remainingUser------>", remainingUser);
  // return remainingUser;
  return res.status(200).send(remainingUser);
};

exports.addGroupMembers = async (req, res) => {
  try {
    const { groupId } = req.query;
    const { AddingGroupMembers } = req.body;
    if (!groupId) {
      return res
        .status(400)
        .send({ success: true, messages: "Enter Group Id" });
    }
    AddingGroupMembers.map(async (singleMember) => {
      // console.log(singleMember);
      await Group.findOneAndUpdate(
        { _id: groupId },
        { $push: { groupMembers: singleMember } }
      );
      await User.findOneAndUpdate(
        { _id: singleMember },
        { $push: { groupIds: groupId } }
      );
    });

    return res
      .status(200)
      .send({ success: true, message: "Users Added successfully" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.updateAsGroupAdmin = async (req, res) => {
  try {
    const { groupId, userId } = req.query;
    // console.log(req.user);

    const getGroup = await Group.findOne({ _id: groupId });
    // console.log(getGroup?.groupMembers.includes(userId));

    // getGroup?.groupMembers.includes(userId)
    if (getGroup?.groupAdmins.includes(req.user._id) !== true) {
      return res
        .status(400)
        .send({ success: false, message: "You Are Not An Admin" });
    }
    if (getGroup?.groupMembers.includes(userId) !== true) {
      return res
        .status(400)
        .send({ success: false, message: "user is not a member of the group" });
    } else if (getGroup?.groupAdmins.includes(userId) === true) {
      return res
        .status(400)
        .send({ success: false, message: "user is already an admin" });
    } else {
      getGroup.groupAdmins.push(userId);

      await Group.findOneAndUpdate(
        { _id: groupId },
        { $push: { groupAdmins: userId } }
      );
      return res
        .status(200)
        .send({ success: true, message: "user is now an admin" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.RemovefromGroupAdmin = async (req, res) => {
  try {
    const { groupId, userId } = req.query;
    let remainingArray;
    let newAdmins;
    console.log(req.user);

    const getGroup = await Group.findOne({ _id: groupId });
    // console.log(getGroup?.groupAdmins.includes(req.user._id))

    if (getGroup?.groupAdmins.includes(req.user._id) !== true) {
      return res
        .status(400)
        .send({ success: false, message: "You Are Not An Admin" });
    }

    if (getGroup?.groupAdmins.includes(userId) === true) {
      remainingArray = getGroup?.groupAdmins?.filter((u) => {
        return u.toString() !== userId;
      });
    }

    // console.log("remainingArray--->", remainingArray);

    await Group.findOneAndUpdate(
      { _id: groupId },
      { groupAdmins: remainingArray }
    );

    return res.status(200).send({ success: false, message: "Admin Removed" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

// Remove Member From Group


// Get All Groups

exports.getAllGroups = async (req, res) => {
  try {
    const { userId } = req.query;
    const allGroups = await Group.find({ groupMembers: { $in: userId } });

    if (!allGroups) {
      return res
        .status(400)
        .send({ success: false, message: "User Is Not present in any group"});
    }

    return res
      .status(200)
      .send({ success: true, message: "Groups Found", data: allGroups });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

// Get Single Group Detail Based On ID

exports.getGroupById = async (req, res) => {
  try {
    const { groupId } = req.query;
    const groupsDetails = await Group.findOne({ _id: groupId });
    if (!groupsDetails) {
      return res
        .status(400)
        .send({ success: false, message: "No Group Found"});
    }

    return res
      .status(200)
      .send({ success: true, message: "Groups Found", data: groupsDetails });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
