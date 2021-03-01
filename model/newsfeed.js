const mongoose = require("mongoose");

const Newsfeed = new mongoose.Schema(
    {
        caption:{
            type: String,
            required: [true,"Enter title"],
            
        },
        title:{
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

module.exports = mongoose.model("Newsfeed",Newsfeed);
