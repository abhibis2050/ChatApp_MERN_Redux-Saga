const Message = require("../models/messages");

exports.sendOneToOneMessage = async (req, res) => {
  try {
    console.log(req.user);
    const { recieverUserId, message } = req.body;

    const createMessage = await Message.create({
      message,
      reciever: recieverUserId,
      sender: req.user,
    });

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
    const { message, groupId } = req.body;

    req.body.isGroupMessage = true;

    const createGroupMessage = await Message.create({
      message,
      groupId,
      sender: req.user,
    });

    return res
      .status(201)
      .send({ success: true, createGroupMessage: createGroupMessage });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};


