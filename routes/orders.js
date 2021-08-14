const express = require('express');
const router = express.Router();

const {createOrder,getOrderDetails} = require('../controllers/orders.js');

router.route("/")
.post(createOrder);

router.route("/:uid")
.get(getOrderDetails);

module.exports = router;