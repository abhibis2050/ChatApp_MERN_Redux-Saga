const Chat = require("../models/chat");

exports.createChat = async (req, res) => {
  try {
    console.log("req.user-------->", req.user);
    req.body.sender = req.user._id;
    const createChat = await Chat.create(req.body);

    return res.status(201).send({
      success: true,
      message: "Group Created Successfully",
      data: createChat,
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.getAllChats = async (req, res) => {
  try {
    const allChats = await Chat.find({ sender: req.user._id }).populate({
      path: "reciever",
    });

    return res.status(200).send({
      success: true,
      message: "All Chats",
      data: allChats,
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};


