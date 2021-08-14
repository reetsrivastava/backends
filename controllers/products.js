const Product = require('../models/product');

const getProduct = async (req, res) => {
   const { productId } = req.params;
   console.log(productId);
   const product = await Product.findById(productId);
   if(product){
      return res.status(200).json({ product  })
   }
   res.status(404).json({ message:"product not found" })
}

const getProducts = async(req, res) => {
   const products = await Product.find({});
   res.json({products})
}

const createNewProduct = async (req, res) => {
  try {
    const productData = req.body;
    const NewProduct = new Product(productData);
    const addedProduct = await NewProduct.save();
    res.status(201).json({ response: addedProduct, success: true });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Unable to create Product. Server Error",
      errorMessage: e.message
    })
  }
}

module.exports = { getProducts,getProduct,createNewProduct };