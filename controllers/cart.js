const ErrorResponse = require("../utils/errorResponse");
const Cart = require("../model/cart");
const asyncHandler = require("../middleware/async");
//To get the file name extension line .jpg,.png
const path = require("path");


//--------------------add to cart------------------

exports.addtoCart = asyncHandler(async (req, res, next) => {
    const { cameraName, cameraPrice, camphoto, cameraCompany} = req.body;
    const cart = await Cart.create({
        cameraName, cameraPrice,cameraCompany, camphoto
      });

  res.status(201).json({
    success: true,
    data: cart,
  });
});

//-------------------Display cart items

exports.getCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.find({});

  res.status(201).json({
    success: true,
    count: cart.length,
    data: cart,
  });
});

// -----------------DELETE cart item------------------------

exports.deleteCart = asyncHandler(async (req, res, next) => {
    const cart = await Cart.findById(req.params.id);
  
    if (!cart) {
      return next(new ErrorResponse(`No cart item found `), 404);
    }
  
    await cart.remove();
  
    res.status(200).json({
      success: true,
      count: cart.length,
      data: {},
    });
  });
  