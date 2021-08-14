const mongoose = require("mongoose");
const { Video } = require("./videos.model");
const { User } = require("./user.model")
const { Schema } = mongoose;

const LikeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  videos: [{ _id: String, name:String,category: String }]
})


const Likes = mongoose.model("Like", LikeSchema);
module.exports = { Likes }