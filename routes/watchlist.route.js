const express = require("express");
const router = express.Router();
const { Watchlist } = require("../models/watchlist.model");
const { getWatchlist } = require("../utils/watchlist.fetch");

const addWatchlist = async (req, res, next) => {
  try {
    const { userid } = req.user;
    const { videos } = req.body;
    const watchlistExist = await Watchlist.findOne({ user: userid });
    if (watchlistExist) {
      await Watchlist.findOneAndUpdate({ user: userid }, { $addToSet: { videos: videos } }
      );
      return next()
    } else {
      const NewWatchlist = new Watchlist({ user: userid, videos });
      await NewWatchlist.save();
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
      const data = await getWatchlist(userid);
      if (data) {
        res.status(200).json({ success: true, watchlistData: data })
      } else {
        res.status(400).json({ message: "Watch list not created yet" })
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal Server Error", errorMessage: errorMessage.message })
    }
  })
  .post(addWatchlist, async (req, res) => {
    try {
      const { userid } = req.user;
      const data = await getWatchlist(userid);
      res.status(201).json({ success: true, watchlistData: data })
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to add videos to Watchlist", errorMessage: error.message })
    }
  })
  .delete(async (req, res) => {
    try {
      const { userid } = req.user;
      await Watchlist.findOneAndRemove({ user: userid })
      res.status(200).json({ success: true })
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to delete item from Watchlist", errorMessage: error.message })
    }
  })

router.route("/:videoid")
  .delete(async (req, res) => {
    try {
      const { userid } = req.user;
      const { videoid } = req.params;
      await Watchlist.findOneAndUpdate({ user: userid }, { $pull: { videos: { _id: videoid } } }
      );
      const data = await getWatchlist(userid);
      res.status(200).json({ success: true, watchlistData: data })
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to delete Watchlist", errorMessage: error.message })
    }

  })


module.exports = router;