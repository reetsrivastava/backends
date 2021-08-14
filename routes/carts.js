const express = require('express');
const router = express.Router();

const { 
    getUserCart,
    checkCart,
    checkProduct,
    addProductInCart,
    increaseQuantityOfProduct,
    decreaseQuantityOfProduct,
    removeProductFromCart,
    emptyCart 
} = require('../controllers/carts.js')

router.param("uid",checkCart);
router.param("productID",checkProduct);

router.route("/:uid")
.get(getUserCart);

router.route("/:uid")
.post(addProductInCart);

router.route("/:uid/:productID/increasequantity")
.post(increaseQuantityOfProduct)

router.route("/:uid/:productID/decreasequantity")
.post(decreaseQuantityOfProduct)

router.route("/:uid/:productID")
.delete(removeProductFromCart)

router.route("/:uid")
.delete(emptyCart)

module.exports = router;