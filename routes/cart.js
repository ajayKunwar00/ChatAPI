const express = require("express");
const  router = express.Router();
const { protect } = require("../middleware/auth");

const {
   addtoCart,
   getCart,
   deleteCart
  } = require("../controllers/cart");

  router.post("/add/cart", addtoCart);
  router.get("/cart/all", getCart)
  router.delete("/delete/:id", deleteCart);
  
  
  module.exports = router