const express = require('express');
const router = express.Router();
const { getPlaylist } = require("../utils/playlist.fetch")
const { Playlist } = require("../models/playlist.model");

const addPlaylist = async (req, res, next) => {
  try {
    const { userid } = req.user;
    const { playlist } = req.body;
    const playlistExists = await Playlist.findOne({ user: userid });
    if (playlistExists) {
      await Playlist.findOneAndUpdate({user:userid}, { $push: { playlist: playlist } }
      );
      return next()
    } else {
      const NewPlaylist = new Playlist({ user: userid, playlist });
      await NewPlaylist.save();
      return next()
    }
  } catch (error) {
    console.log(error);
  }
}

// create and get initial playlist
router.route("/")
  .get(async (req, res) => {
    try {
      const { userid } = req.user;
      const data = await getPlaylist(userid);
      if(data){
        res.status(200).json({ success: true, playlistData: data })
      }else{
         res.status(400).json({ message:"Playlist not created yet" })
      }
     
    }
    catch (error) {
      res.status(500).json({ success: false, message: "Could not fetch data", errorMessage: error.message })
    }
  })
  .post(addPlaylist, async (req, res) => {
    try {
      const { userid } = req.user;
      const data = await getPlaylist(userid);
      res.status(201).json({ success: true, playlistData: data })
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to add products to Wishlist", errorMessage: error.message })
    }
  })


// playlist management
router.route("/:playlistid")
  .get(async (req, res) => {
    try {
      const { playlistid } = req.params;
      const [data] = await Playlist.find({ "playlist._id": playlistid }, {
        playlist: {
          $elemMatch: {
            _id: playlistid
          }
        }
      })
      res.status(200).json({ success: true, playlistData: data })
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to create new playlist", errorMessage: error.message })
    }
  })
  .post(async (req, res) => {
    try {
      const { playlistid } = req.params;
      const { videodata } = req.body;
      const { userid } = req.user;
      await Playlist.updateOne({ "user": userid, "playlist._id": playlistid }, { "$addToSet": { "playlist.$.list": videodata } });
      const data = await getPlaylist(userid);
      res.status(201).json({ success: true, playlistData: data })
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to create new playlist", errorMessage: error.message })
    }
  })
  .delete(async (req, res) => {
    try {
      const { playlistid } = req.params;
      const { userid } = req.user;
      console.log(playlistid,userid)
      await Playlist.findOneAndUpdate({user:userid}, { $pull: { playlist: { _id: playlistid } } }
      );
      const data = await getPlaylist(userid);
      res.status(200).json({ success: true, playlistData: data })
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to create new playlist", errorMessage: error.message })
    }
  })


router.route("/:playlistid/:videoid")
  .delete(async (req, res) => {
    try {
      const { playlistid, videoid } = req.params;
      const { userid } = req.user;
      await Playlist.updateOne({ "user": userid, "playlist._id": playlistid }, { "$pull": { "playlist.$.list": { "_id": videoid } } });
      const data = await getPlaylist(userid);
      res.status(201).json({ success: true, playlistData: data })
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to create new playlist", errorMessage: error.message })
    }
  })




module.exports = router;