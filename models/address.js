const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    uid:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User"
    },
    addresses:[
        {
            name:{
                type:String,
                required:true,
                trim:true
            },
            type:{
                type:String,
                trim:true
            },
            number:{
                type:Number,
                trim:true,
                required:true
            },
            address:{
                type:String,
                trim:true
            },
            locality:{
                type:String,
                required:true,
                trim:true
            },
            city:{
                type:String,
                trim:true
            },
            state:{
                type:String,
                required:true,
                trim:true
            },
            pincode:{
                type:Number,
                required:true,
                trim:true
            }
        }
    ],
    selectedAddress:{
        type:Object,
        default:{}
    }
},{ timestamps: true})

module.exports = mongoose.model("Address",addressSchema);