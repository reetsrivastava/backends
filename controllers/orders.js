const Orders = require("../models/order");

const createOrder = async(req,res) => {
   const { uid,products,address } = req.body;
   await Orders.create({ uid,products,address });
   return res.status(200).json({message:"Order placed successfully"})
}

const getOrderDetails = async(req,res) => {
    const {uid} = req.params;

    const orders = await Orders.find({uid}).lean().populate("products.product");

    if(orders.length > 0) {
        return res.status(200).json({ orders })
    }

    res.status(404).json({orders:[],message:"No orders found"})
    
}

module.exports = {createOrder,getOrderDetails};