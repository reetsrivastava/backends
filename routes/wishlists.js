const express = require('express');
const router = express.Router();

const { 
    checkWishlist,
    checkProduct,
    getUserWishlist,
    removeProductFromWishlist,
    addProductInWishlist
} = require('../controllers/wishlists.js')

router.param("uid",checkWishlist);
router.param("productID",checkProduct);

router.route("/:uid")
.get(getUserWishlist);

router.route("/:uid")
.post(addProductInWishlist);

router.route("/:uid/:productID")
.delete(removeProductFromWishlist)

module.exports = router;