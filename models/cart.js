const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
     uid:{
         type: mongoose.Schema.Types.ObjectId,
         ref:"User"
     },
     products:[
         { 
             product:{
                 type:mongoose.Schema.Types.ObjectId,
                 ref:"Product",
                 required:true
             },
             quantity:{
                 type:Number,
                 default:1
             }
        }
    ]
},{ timestamps: true });

module.exports = mongoose.model('Cart',cartSchema);