const mongoose = require("mongoose");
const { Schema } = mongoose;
const VideoSchema = new Schema({
      _id:String,
      name:String,
      category:String
})

const Video = mongoose.model("Video", VideoSchema);

module.exports = {Video};