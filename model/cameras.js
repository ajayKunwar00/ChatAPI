const mongoose = require("mongoose");

const Cameras = new mongoose.Schema(
    {
        productname:{
            type: String,
            required: [true,"Enter title"],
            
        },
        price:{
            type: String,
            required: [true,"Enter title"],
        },
        description:{
            type: String,
            required: [true,"Enter title"],
        },
        company:{
            type: String,
            required: [true,"Enter title"],
        },
        photo: {
            type: String,
            default: "no-photo.jpg",
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
    }
);

module.exports = mongoose.model("Cameras",Cameras);
