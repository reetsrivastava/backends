const mongoose = require('mongoose');

const productCartSchema = new mongoose.Schema({
     product:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"Product"
     },
     name:{type:String},
     quantity:{type:Number},
     price:{type:Number}
});

const orderSchema = new mongoose.Schema({
    uid:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User"
    },
    products:[productCartSchema],
    address:{type:Object}
},{ timestamps: true})

module.exports = mongoose.model("Order",orderSchema);