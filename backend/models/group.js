const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const groupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
  },
  GroupAvatar: {
    id:{
        type:String
    },
    secure_url:{
        type:String
    }
  },
  CreatedBy: {
    type: ObjectId,
    ref: "user",
  },
  groupMembers: [
    {
      type: ObjectId,
      ref: "user",
    },
  ],
  groupAdmins: [
    {
      type: ObjectId,
      ref: "user",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("group", groupSchema);
