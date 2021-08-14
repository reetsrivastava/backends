const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        true:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        index:1
    },
    password:{
        type:String,
        trim:true,
        required:true,
        minlength:8,
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Cart"
    },
    wishlist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wishlist"
    },
    addresses:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address"
    },
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order"
    }]
},{timestamps:true});

module.exports = mongoose.model('User',userSchema);