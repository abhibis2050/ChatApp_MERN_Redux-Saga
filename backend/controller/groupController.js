const Group = require("../models/group");
const User = require("../models/user");
const mongoose = require("mongoose");

exports.createGroup = async (req, res) => {
  try {
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
          groupAdmins: req.user,
          groupMembers: req.user,
        },
      }
    );
    await User.findOneAndUpdate({ _id: req.user }, { isGroupAdmin: true });

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
  const { GroupId } = req.query;

  let remainingUser = [];

  const findGroup = await Group.findOneAndUpdate({
    _id: GroupId,
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
    const { GroupId } = req.query;
    const { AddingGroupMembers } = req.body;

    AddingGroupMembers.map(async (singleMember) => {
      await Group.findOneAndUpdate(
        { _id: GroupId },
        { $push: { groupMembers: singleMember } }
      );
    });
    return res
      .status(200)
      .send({ success: true, message: "Users Added successfully" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.AddGroupAdmin = async (req, res) => {
  try {

  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.RemoveGroupAdmin = async (req, res) => {
    try {
  
    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
  };
