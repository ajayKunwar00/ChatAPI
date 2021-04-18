const mongoose = require('mongoose');
const date = new Date().toLocaleDateString("en-US").split("/").toString()
const Cart = mongoose.model('Cart', {

   cameraName : {
        type : String,
        required : [true,'Enter camera name on cart']
    },
    cameraPrice: {
        type: String,
        required : [true,'Enter price on cart']
        },
        cameraCompany: {
          type: String,
          required : [true,'Enter company on cart']
          },
    camphoto: {
        type: String,
        default: "no-photo.jpg",
      },
    quantity: {
        type: String,
        default: 1,
      },

});

module.exports = Cart