const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Enter The Title"],
  },
  description: {
    type: String,
    required: [true, "Please Enter The Description"],
  },
  category: {
    type: String,
    enum: [
      "TECHNOLOGY",
      "FASHION",
      "TRAVELL",
      "FITNESS",
      "BUSINESS",
      "PHOTOGRAPHY",
      "ENVIRONMENT",
      "OTHERS",
    ],
  },
  image: {
    id: {
      type: String,
    },
    secure_url: {
      type: String,
    },
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: String,
    },
  ],
  user: {
    type: ObjectId,
    ref: "User",
  },
},{
  timestamps:true
});

module.exports = mongoose.model("blog", blogSchema);
