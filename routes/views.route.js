const express = require("express");
const router = express.Router();
const { Views } = require("../models/views.model");

const addViews = async (req, res, next) => {
  try {
    const { videoid } = req.body;
    const data = await Views.findById(videoid);
    if (data) {
      await Views.updateOne({ _id: videoid }, { $inc: { views: 1 } })
      return next()
    } else {
      const NewViews = new Views({ _id: videoid, views: 1 });
      await NewViews.save();
      return next()
    }
  } catch (error) {
    console.log(error);
  }
}

router.route("/")
  .post(addViews, async (req, res) => {
    try {
      const { videoid } = req.body;
      const data = await Views.findById(videoid);
      res.status(201).json({ success: true, views:data.views })
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to add videos to History", errorMessage: error.message })
    }
  })

module.exports = router;