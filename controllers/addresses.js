const Addresses = require("../models/address");
const Users = require("../models/user");

const checkAddresses = async(req,res,next,uid) => {
    const data = await Addresses.findOne({uid});
    req.userAddress = data;
    next();
}

const getUserAddresses = (req,res) =>{
    const {userAddress} = req;
      
     if(userAddress){
        return res.status(200).json({ addresses:userAddress.addresseses,selectedAddress:userAddress.selectedAddress })
     }

     res.status(404).json({ message:"User addresses not found" })
}

const addAddress = async(req,res) => {
    const {userAddress} = req;
    const {uid} = req.params;

    try {
        if(!userAddress){
            const createAddress = await Addresses.create({uid,addresses:[req.body]});
            return res.status(200).json({success:true,addresses:createAddress.addresses,message:"Address added successfully"})
        }

        userAddress.addresses.push(req.body);
        
        await userAddress.save((err,addresses) => {
            if(err){
                return res.status(500).json({success:false, message:"Something went wrong with server"})
            }
            if(addresses){
               return res.status(200).json({success:true,addresses,message:"Address added successfully"})
            }
        });
    } catch (error) {
        res.status(500).json({message:"something went wrong with server"})
    }
}

const removeAddress = async (req, res) => {
    const {userAddress} = req;
    const {addressID} = req.params;

    userAddress.addresses = userAddress.addresses.filter(address => address._id != addressID);
    await userAddress.save((err,addresses) => {
        if(addresses){
           return res.status(200).json({success:true,addresses,message:"Address removed successfully"})
        }
        if(err){
            return res.status(500).json({success:false,message:"Something went wrong with server"})
        }
    })

}

const updateAddress = async(req,res) => {
    const {userAddress} = req;
    const {addressID} = req.params;

    userAddress.addresses = userAddress.addresses.map(address => address._id == addressID ? req.body : address);
     await userAddress.save((err,addresses) => {
        if(addresses){
            return res.status(200).json({success:true,addresses,message:"Address updated successfully"})
         }
         if(err){
             return res.status(500).json({success:false,message:"Something went wrong with server"})
         }
     });
}

const setAddress = async(req,res) => {
    const {addressID} = req.params;
    const {userAddress} = req;
     
    const address = userAddress.addresses.find( address => address._id == addressID);
    userAddress.selectedAddress = address;

     await userAddress.save((err,addresses) => {
        if(addresses){
            return res.status(200).json({success:true,selectedAddress:addresses.selectedAddress,message:"selected Address updated successfully"})
         }
         if(err){
             return res.status(500).json({success:false,message:"Something went wrong with server"})
         }
     })
}

module.exports = { getUserAddresses,checkAddresses,addAddress,removeAddress,updateAddress,setAddress }