const express = require("express");
const  router = express.Router();

const {
  addcamera,
  getcamera, 
  CameraUploadPhoto,
  } = require("../controllers/cameras");
const { protect } = require("../middleware/auth");


  router.post("/cameras", protect, addcamera);
  router.get("/cameras/all", getcamera)
  router.put("/camera/:id/photo",protect, CameraUploadPhoto);

  module.exports = router