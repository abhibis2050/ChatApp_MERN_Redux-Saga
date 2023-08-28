const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const chatSchema = new mongoose.Schema({
  userOne: {
    type: ObjectId,
    ref: "user",
  },
  userTwo: {
    type: ObjectId,
    ref: "user",
  },
},{
  timestamps:true
});

module.exports = mongoose.model("chat", chatSchema);
