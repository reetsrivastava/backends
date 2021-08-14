const Wishlists = require('../models/wishlist');
const Products = require('../models/product');

const checkWishlist = async(req,res,next,uid) => {
    try {
        const wishlist = await Wishlists.findOne({uid});
        req.wishlist = wishlist;
        next();
    } catch (error) {
         res.status(404).json({ message:"wishlist not found" })
     }
}

const checkProduct = async(req,res,next,productID) => {
    const {wishlist} = req;
  
    try {
       const product = wishlist.products.find( i => i == productID );

       if(!product){
           return res.status(404).json({message:"product not found"}) 
       }
       req.product = product;
       next()
    } catch (error) {
        res.status(404).json({message:"product not found"}) 
    }
}

const getUserWishlist = async(req, res) => {
    const {wishlist} = req;

    try {
        if(wishlist){
          const {products} = await wishlist.execPopulate({ path:"products",populate:"product" });
          return res.status(200).json({wishlist:products})
        }
        res.status(200).json({wishlist:[]})
    } catch (error) {
         res.status(404).json({ message:"Wishlist not found" })
     }

}

const addProductInWishlist = async(req,res) => {

    let {wishlist} = req;
    const {productID} = req.body;
    const { uid } = req.params;

    const product = await Products.findById(productID);
    if(wishlist){
        wishlist.products.push(product.id);
        await wishlist.save(async(err,result) => {
            if(err){
                return res.status(500).json({success:false, message:"Something went wrong with server"})
             }
             if(result){
                const wishlist = await result.execPopulate({ path:"products",populate:"product" });
                return res.status(200).json({success:true,wishlist,message:"Product added in wishlist"})
             }
        });
        return;
    }

    const createWishlist = await Wishlists.create({ uid,products:[product.id] });
    await createWishlist.execPopulate({ path:"products",populate:"product" });
    res.status(200).json({success:true,wishlist:createWishlist,message:"Product added in wishlist"})

}

const removeProductFromWishlist = async(req,res) => {
    let { wishlist,product } = req;

    wishlist.products.remove(product)

    await wishlist.save(async(err,result) => {
        if(err){
            return res.status(500).json({success:false, message:"Something went wrong with server"})
         }
         if(result){
            const wishlist = await result.execPopulate({ path:"products",populate:"product" });
            return res.status(200).json({success:true,wishlist,message:"Product removed from wishlist"})
         }
    });
}


module.exports = { 
    checkWishlist,
    checkProduct,
    getUserWishlist,
    removeProductFromWishlist,
    addProductInWishlist
};