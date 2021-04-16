const { json } = require('express')
const express = require('express')
const { verifyUser } = require('../middleware/auth')
const router = express.Router()

const Cameras=require('../model/newsfeed')
const User = require('../model/user')
const cart=require('../model/cart');
const date = new Date().toLocaleDateString("en-US").split("/").toString()
const auth=require('./auth')

 
router.get('/cart',function(req,res,next){
//console.log(req.user)
const uid= req.userInfo._id
 
User.findById({_id:uid}).then(user=>{

if(user.cart.length===0){
    cart.create({userId:uid,product:[]}).then(cart=>{
        user.cart.push(cart._id)
        user.save().then(user=>{
            res.json(cart)
        }).catch(err=>next(err))
    })
}else{
    cart.findById(user.cart[0]).then(cart=>{
        res.json(cart)
    }).catch(err=>next(err))
}

  
 }
  ).catch(err=>next(err));
 
})
router.route('/cart').post((req,res,next)=>{
    const uid= req.userInfo._id
 
User.findById({_id:uid}).then(user=>{
    cart.findById({_id:user.cart[0]}).then(cart=>{
        cart.product.push(req.body)
        cart.save().then(cart=>{
            res.json(cart)
        }).catch(error=>next(error))

    }).catch(error=>next(error))


}).catch(error=>next(error))
})

    






 
router.get('/cart/show',function(req,res){
const id = req.userInfo._id
 
product.find({UserId:_id}).populate('UserId').populate('ProductId').then(function(data){
    console.log(data)
    let total =0
    data.map((item)=>{
 
        let qty = item.Qty
        let price = item.ProductId.price;
        total += price * qty
      
      
      
       
      })
res.status(200).json({data:data,total:total})
}).catch()
})

router.delete('/cart/delete/:id',function(req,res,next){
    const id = req.params.id
    const userid=req.userInfo._id;
    console.log(userid)
    let prdlist=[];
     let newlist=[];
     
        cart.find({userId:userid}).then(result=>{
            let cart_id=result[0]._id;
            cart.findById(cart_id).then(result=>{
               // res.json(result.product)
                let newProducts=[];
                result.product.forEach(row => {
                           if(row._id!=req.params.id){
                   newProducts.push(row);
               }
                    
                });
                result.product=newProducts;
                result.save().then(result=>{
                    res.json(result);
                })

            })
        }).catch(err=>next(err));
  

   
   
        

  
 

})

 
module.exports=router;