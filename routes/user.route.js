const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const mySecret = process.env['TOKEN_KEY'];
const { User } = require("../models/user.model");

const checkExistingUser = async (req, res, next) => {
  try {
    const { user } = req.body;
    const emailExist = await User.findOne({ email: user.email });
    const usernameExist = await User.findOne({ username: user.username });
    if (emailExist || usernameExist) {
      res.status(409).json({ success: false, message: "User already exist" })
      return;
    } else {
      req.userdata = user;
      return next();
    }
  } catch (error) {
    console.log(error);
  }
}

router.route("/signup")
  .post(checkExistingUser, async (req, res) => {
    try {
      const user = req.userdata;
      const newUser = new User(user);
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);
      newUser.save().then((doc) => res.status(201).json({ success: true, message: "User created successfully" }));
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to Create New User", errorMessage: error.message })
    }
  })


const getUsername = async (req, res, next) => {
  try {
    const { userCredential, password } = req.body.user;
    console.log(userCredential)
    let userData="";
    if(userCredential.includes("@")){
      userData = await User.findOne({ email: userCredential});
    }else{
      userData = await User.findOne({ username: userCredential });
    }
   
    if (userData) {
      const validPassword = await bcrypt.compare(password, userData.password);
      if (validPassword) {
        req.user = userData;
        return next();
      }
    }
    res.status(403).json({ message: "Username or password incorrect" });

  } catch (error) {
    console.log(error)
  }
}

router.route("/login")
  .post(getUsername, (req, res) => {
    const { _id, username, email } = req.user;
    const token = jwt.sign({
      userid: _id
    }, mySecret, { expiresIn: '24h' });
    res.status(200).json({ success: true, token: token, userdata: { _id: _id, username: username, email: email }, message: "User authenticated successfully" })
  })



module.exports = router;