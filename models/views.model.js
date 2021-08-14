const mongoose = require("mongoose");
const { Schema } = mongoose;

const ViewSchema = new Schema({
  _id:{type:String},
  views:Number
})

const Views = mongoose.model("View",ViewSchema);
module.exports = { Views }