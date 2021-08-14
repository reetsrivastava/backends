const express = require('express');
const router = express.Router();
const { Video } = require("../models/videos.model");
const { Views } = require("../models/views.model");
const { data } = require("../data/data");

router.route("/")
  .get(async (req, res) => {
    try {
      const data = await Video.find({});
      res.status(200).json({ success: true, videodata: data });
    } catch (error) {
      res.status(404).json({ success: false, message: "The server can not find the requested resource.", error: error.message })
    }
  })

router.route("/:videoid")
  .get(async (req, res) => {
    try {
      const { videoid } = req.params;
      const videoDetails =  Video.findById(videoid);
      const videoViews =  Views.findById(videoid).select("views");
      const [data,totalViews] = await Promise.all([videoDetails,videoViews])
      let videoData;
      if(totalViews){
         videoData = {...data.toObject(),views:totalViews.views};
      }else{
         videoData = {...data.toObject(),views:0};
      }
      videoData.__v = undefined;
      res.status(200).json({ success: true, videodata: videoData});
    } catch (error) {
      res.status(404).json({ success: false, message: "The server can not find the requested resource.", error: error.message })
    }
  })

module.exports = router;

