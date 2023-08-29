const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  about: {
    type: String,
  },
  avatar: {
    id: {
      type: String,
    },
    secure_url: {
      type: String,
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: "String",
    required: [true, "please enter your password"],
  },
  refresh_token: {
    type: String,
  },
  refresh_token_expiry: {
    type: Date,
  },
  forgotPasswordToken: {
    type: String,
  },
  forgotPasswordExpiry: {
    type: Date,
  },
  contacts: [
    {
      type: ObjectId,
      ref: "user",
    },
  ],
  blockContacts: [
    {
      type: ObjectId,
      ref: "user",
    },
  ],
  isGroupAdmin: {
    type: Boolean,
    default: false,
  },
  socketId: {
    type: String,
  },
  groupIds: [
    {
      type: ObjectId,
      ref: "groupMessage",
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
