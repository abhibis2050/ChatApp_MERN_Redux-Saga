const Chat = require("../models/chat");
const User = require("../models/user");

exports.createChat = async (req, res) => {
  try {
    console.log("req.user-------->", req.user);
    const createChat = await Chat.create(req.body);

    return res.status(201).send({
      success: true,
      message: "Chat Created Successfully",
      data: createChat,
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.getAllChats = async (req, res) => {
  try {
    let requireChats = [];

    const allChats = await Chat.find({
      $or: [{ userOne: req.user._id }, { userTwo: req.user._id }],
    })
      .populate("userOne")
      .populate("userTwo");

    allChats.map(async (singleChat) => {
      // console.log("singleChat------->", singleChat);
      if (singleChat?.userOne._id.toString() === req.user._id) {
        return requireChats.push({
          _id: singleChat._id,
          sender: singleChat?.userOne?._id,
          oppositeId:singleChat?.userTwo ,
        });
      }
      if (singleChat?.userOne.toString() !== req.user._id) {
        return requireChats.push({
          _id: singleChat._id,
          sender: singleChat?.userTwo?._id,
          oppositeId: singleChat?.userOne
        });
      }
    });

    console.log("requireChats------->", requireChats);
    return res.status(200).send({
      success: true,
      message: "All Chats",
      data: requireChats,
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
