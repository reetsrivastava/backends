const mongoose = require("mongoose");
const { Video } = require("./videos.model");
const { User } = require("./user.model")
const { Schema } = mongoose;

const WatchlistSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  videos: [{ _id: String, name:String,category: String }]
})


const Watchlist = mongoose.model("Watchlist", WatchlistSchema);
module.exports = { Watchlist }