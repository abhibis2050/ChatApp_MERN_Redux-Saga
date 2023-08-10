const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const chatSchema = new mongoose.Schema({
  sender: {
    type: ObjectId,
    ref: "user",
  },
  reciever: {
    type: ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("chat", chatSchema);
