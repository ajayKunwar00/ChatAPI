const mongoose = require('mongoose');
const Product=require('./newsfeed');
const date = new Date().toLocaleDateString("en-US").split("/").toString()
const RowOfCart=new mongoose.Schema({
    productId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'newsfeed'
  },
  productName:{
    type:String,
      required:true
  },
  productPrice:{
    type:String,
    required:true
  },
  productImage:{
  type:String,
  required:true
  
  },
  
  quantity:{
    type:Number,
    required:true,
    default:1
  },
  total:{
    type:String,
    required:true
  }
  })
  
  const cartSchema= new mongoose.Schema
  ({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    
    product:[RowOfCart]
  
  },{ timestamps: true });
  
  module.exports = mongoose.model('Cart',cartSchema)