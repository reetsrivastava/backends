const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
     uid:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User"
     },
     products:[
        {    
               type:mongoose.Schema.Types.ObjectId,
               ref:"Product"
        }
    ]
},{ timestamps: true });

module.exports = mongoose.model('Wishlist',wishlistSchema);