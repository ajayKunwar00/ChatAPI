const express = require("express");
const  router = express.Router();

const {
  createnewsfeed,
  getnewsfeed, 
  getnewsfeedById,
  NewsfeedUploadPhoto,
  } = require("../controllers/newsfeed");

  const { protect } = require("../middleware/auth");

  router
  .route("/")
  .get(protect,getnewsfeed)
  .post(protect,createnewsfeed);

  router
  .route("/:id/photo")
  .put(protect, NewsfeedUploadPhoto);

  router
  .route("/:id")
  .get(protect,getnewsfeedById);
  

  module.exports = router