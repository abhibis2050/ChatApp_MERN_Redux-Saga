const Message = require("../models/messages");

exports.sendOneToOneMessage = async (req, res) => {
  try {
    console.log(req.user);

    req.body.sender=req.user._id

    const createMessage = await Message.create(req.body);

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
    const { recieverId } = req.query;
   
    if (!recieverId) {
      return res
        .status(400)
        .send({ success: true, messages: "Enter Reciever Id" });
    }

    const getAllMessages = await Message.find({
      sender: req.user._id,
      reciever: recieverId,
    });

    return res.status(200).send({ success: true, messages: getAllMessages });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
