const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const messageSchema = new mongoose.Schema(
  {
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
    chatId: {
      type: ObjectId,
      ref: "chat",
    },
    groupId: {
      type: ObjectId,
      ref: "groupMessage",
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("message", messageSchema);
