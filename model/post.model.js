const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userID: String,
    title: String,
    body: String,
    device: String,
  },
  {
    versionKey: false,
  }
);

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
