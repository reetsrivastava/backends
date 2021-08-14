const express = require("express");
const router = express.Router();

const { checkAddresses,getUserAddresses,addAddress,removeAddress,updateAddress,setAddress } = require("../controllers/addresses");

router.param("uid",checkAddresses)
router.route("/:uid").get(getUserAddresses);
router.route("/:uid").post(addAddress);

router.route("/:uid/:addressID").post(updateAddress);
router.route("/:uid/:addressID").delete(removeAddress);

router.route("/:uid/:addressID/setaddress").post(setAddress);

module.exports = router;