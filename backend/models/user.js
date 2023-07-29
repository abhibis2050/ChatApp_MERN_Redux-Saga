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
    id:{
        type:String
    },
    secure_url:{
        type:String
    }
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  refreshToken:{
    type:String
  },
  refreshTokenExpiry:{
    type:Date
  },
  forgotPasswordToken: {
    type: String,
  },
  forgotPasswordExpiry: {
    type: Date,
  },
  contacts:[
    {
      type:ObjectId,
      ref:"user"
    }
  ],
  isGroupAdmin:{
    type: Boolean,
    default:fasle
  },
  groupId:{
    type: ObjectId,
    ref: "groupMessage",
  },
});


module.exports = mongoose.model("user", userSchema);
