const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: [true, "Please enter username"] },
  email: { type: String, required: [true, "Please enter email"]},
  password: { type: String, required: ["true", 'Please enter password'] }
})

const User = mongoose.model("User", UserSchema);

module.exports = { User };