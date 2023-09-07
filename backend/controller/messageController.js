const Message = require("../models/messages");
const User = require("../models/user");

exports.sendOneToOneMessage = async (req, res) => {
  try {
    console.log(req.user);

    req.body.sender=req.user._id
    // req.body.sender="64d28267e5b4e55f01544084"

    const createMessage = await Message.create(req.body)

    // const findSender = await User.findOne({_id:createMessage.sender})
    // const findReciever = await User.findOne({_id:createMessage.reciever})
    
    // // console.log("create message------------------->",createMessage)


    // global.io.to(findSender?.socketId).emit("recieveMessage",createMessage.message)
    // global.io.to(findReciever?.socketId).emit("recieveMessage",createMessage.message)

   

    return res
      .status(201)
      .send({ success: true, createMessage: createMessage });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.sendGroupMessage = async (req, res) => {
  try {
    console.log(req.user);
    // const { message, groupId } = req.body;

    req.body.isGroupMessage = true;
    req.body.sender = req.user?._id;
    
    const createGroupMessage = await Message.create(req.body);

    return res
      .status(201)
      .send({ success: true, createGroupMessage: createGroupMessage });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.getAllGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.query;
    if (!groupId) {
      return res
        .status(400)
        .send({ success: true, messages: "Enter Group Id" });
    }

    const getAllGroupMessages = await Message.find({
      groupId: req.query.groupId,
    });
    console.log(getAllGroupMessages);
    return res
      .status(200)
      .send({ success: true, messages: getAllGroupMessages });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.getAlloneToOneMessages = async (req, res) => {
  try {
    const {chatId } = req.query;
   
    if (!chatId) {
      return res
        .status(400)
        .send({ success: true, messages: "Enter chatId Id" });
    }

    const getAllMessages = await Message.find({chatId:chatId});

    return res.status(200).send({ success: true, messages: getAllMessages });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
