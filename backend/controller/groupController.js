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
    // await User.findOneAndUpdate({ _id: req.user }, { isGroupAdmin: true });

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

    return res
      .status(400)
      .send({ success: false, message: "Admin Removed"});
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
