const express = require('express');
const router = express.Router();
const {createNewProduct} = require("../controllers/products");


const { getProducts,getProduct } = require('../controllers/products.js')

router.get('/:productId',getProduct)
router.get('/',getProducts)
router.post('/',createNewProduct);

module.exports = router;