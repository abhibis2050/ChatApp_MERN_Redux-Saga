const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const blogSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: [true, "Please Enter The Title"],
  },
  description: {
    type: String,
    required: [true, "Please Enter The Description"],
  },
  category: {
    type: String,
    required:true,
    enum: [
      "TECHNOLOGY",
      "FASHION",
      "TRAVELL",
      "FITNESS",
      "BUSINESS",
      "PHOTOGRAPHY",
    ],
  },
  image: {
    id: {},
    secure_url: {},
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
});

module.exports = mongoose.model("blog", blogSchema);