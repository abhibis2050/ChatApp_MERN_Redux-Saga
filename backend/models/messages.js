const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  sender: {
    type: ObjectId,
    ref: "user",
  },
  reciever: {
    type: ObjectId,
    ref: "user",
  },
  isRead: {
    type: Boolean,
  },
  isGroupMessage: {
    type: Boolean,
    default: false,
  },
  groupId: {
    type: ObjectId,
    ref: "groupMessage",
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("message", messageSchema);
