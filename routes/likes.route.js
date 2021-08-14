const express = require("express");
const router = express.Router();
const { Likes } = require("../models/likes.model");
const { getLikes } = require("../utils/likes.fetch")


const addLikes = async (req, res, next) => {
  try {
    const { userid } = req.user;
    const { videos } = req.body;
    const likesExist = await Likes.findOne({ user: userid });
    console.log(likesExist)
    if (likesExist) {
      console.log("running")
      const myTestData = await Likes.findOneAndUpdate({ user: userid }, { $addToSet: { videos: videos } }, { new: true }
      );
      console.log("test data", myTestData)
      return next();
    } else {
      const NewLikes = new Likes({ user: userid, videos });
      await NewLikes.save();
      return next()
    }
  } catch (error) {
    console.log(error);
  }
}

router.route("/")
  .get(async (req, res) => {
    try {
      const { userid } = req.user;
      const data = await getLikes(userid);
      if(data){
          res.status(200).json({ success: true, likeData: data })
      }else{
          res.status(400).json({message:"Like list not created yet"})
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal Server Error", errorMessage: error.message })
    }
  })
  .post(addLikes, async (req, res) => {
    try {
      const { userid } = req.user;
      const data = await getLikes(userid);
      res.status(201).json({ success: true, likeData: data })
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to add videos to Likes", errorMessage: error.message })
    }
  })
  .delete(async (req, res) => {
    try {
      const { userid } = req.user;
      console.log("userid", userid);
      await Likes.findOneAndRemove({ user: userid })
      res.status(200).json({ success: true })
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to delete item from Likes", errorMessage: error.message })
    }
  })

router.route("/:videoid")
  .delete(async (req, res) => {
    try {
      const { userid } = req.user;
      const { videoid } = req.params;
      await Likes.findOneAndUpdate({ user: userid }, { $pull: { videos: { _id: videoid } } }
      );
      const data = await getLikes(userid);
      res.status(200).json({ success: true, likeData: data })
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ success: false, message: "Unable to delete Likes", errorMessage: error.message })
    }

  })


module.exports = router;